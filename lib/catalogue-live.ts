/**
 * Live activity catalogue for the /activities pages (server only). Reads the Bond backend's public API at request
 * time, cached for LIVE_REVALIDATE_SECONDS, so changes made in the admin panel appear within a minute without a
 * rebuild. Activity photos come from the backend only (featured image); location photos keep the website's own.
 *
 * Falls back to the build snapshot (lib/generated/catalogue.json) when the API is not configured or unreachable,
 * so a backend outage never takes the pages down.
 *
 * BOND_API_URL  backend base URL including /api/v1 (server-side; NEXT_PUBLIC_BOND_API_URL is used when unset).
 */

import { activities as snapshotActivities, type Activity, type NextSessionInfo } from '@/lib/activities'
import { LOCATION_MEDIA } from '@/lib/catalogue-media'
import { toActivity, toLocation } from '@/lib/catalogue-mapping.mjs'
import { locations as snapshotLocations, type Location, type LocationImage } from '@/lib/locations'

/** Seconds a fetched catalogue is reused. Signed image URLs last an hour, so pages never hold expired links. */
export const LIVE_REVALIDATE_SECONDS = 60

const API = (process.env.BOND_API_URL || process.env.NEXT_PUBLIC_BOND_API_URL || '').replace(/\/+$/, '')

export type LiveCatalogue = { activities: Activity[]; locations: Location[]; live: boolean }

const snapshot = (): LiveCatalogue => ({ activities: snapshotActivities, locations: snapshotLocations, live: false })

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${API}${path}`, {
    headers: { accept: 'application/json' },
    next: { revalidate: LIVE_REVALIDATE_SECONDS },
    signal: AbortSignal.timeout(10_000),
  })
  if (!response.ok) throw new Error(`${path} → HTTP ${response.status}`)
  return ((await response.json()) as { data: T }).data
}

type Mapped<T> = T & { remoteImage?: LocationImage }

type PublicSession = {
  startsAt: string
  localDate: string
  localStartTime: string
  remainingSeats: number
  bookable?: boolean
  location: { slug: string }
  activity: { slug: string }
}

/** At most this many pages of upcoming sessions (100 each) are read per refresh. */
const SESSION_PAGES = 5

/**
 * Earliest upcoming session with free places per activity × location (GET /sessions lists only future sessions,
 * default window ~2 months). Null when sessions cannot be read, so statuses fall back to the old behaviour.
 */
async function nextSessions(): Promise<Map<string, NextSessionInfo> | null> {
  try {
    const sessions: PublicSession[] = []
    for (let page = 1; page <= SESSION_PAGES; page++) {
      const batch = await get<PublicSession[]>(`/sessions?limit=100&page=${page}`)
      sessions.push(...batch)
      if (batch.length < 100) break
    }
    const now = Date.now()
    const next = new Map<string, NextSessionInfo>()
    for (const session of [...sessions].sort((a, b) => a.startsAt.localeCompare(b.startsAt))) {
      if (session.remainingSeats < 1 || session.bookable === false || Date.parse(session.startsAt) <= now) continue
      const key = `${session.activity.slug}|${session.location.slug}`
      if (!next.has(key)) next.set(key, { date: session.localDate, time: session.localStartTime, seatsRemaining: session.remainingSeats })
    }
    return next
  } catch {
    return null
  }
}

export async function getLiveCatalogue(): Promise<LiveCatalogue> {
  if (!API) return snapshot()
  try {
    const [locationList, activityList, sessions] = await Promise.all([
      get<Record<string, unknown>[]>('/locations?limit=100&sort=recommended'),
      get<{ slug: string }[]>('/activities?limit=100&sort=recommended'),
      nextSessions(),
    ])
    const locations: Location[] = locationList.map((item) => {
      const { remoteImage, ...location } = toLocation(item, { signedImages: true }) as Mapped<Location>
      const media = LOCATION_MEDIA[location.slug] ?? {}
      return { ...location, image: media.image ?? remoteImage, gallery: media.gallery }
    })
    const activities: Activity[] = await Promise.all(
      activityList.map(async (item) => {
        const offerings = await get<unknown[]>(`/activities/${encodeURIComponent(item.slug)}/locations?limit=100`)
        const { remoteImage, ...activity } = toActivity(item, offerings, { signedImages: true }) as Mapped<Activity>
        return {
          ...activity,
          image: remoteImage,
          sessionsKnown: sessions !== null,
          // Each offering carries its live location and next session, so cards, filters and statuses agree.
          offerings: activity.offerings.map((offering) => {
            const location = locations.find((entry) => entry.slug === offering.locationSlug)
            const nextSession = sessions?.get(`${activity.slug}|${offering.locationSlug}`)
            return { ...offering, ...(location ? { location } : {}), ...(nextSession ? { nextSession } : {}) }
          }),
        }
      }),
    )
    return { activities, locations, live: true }
  } catch (error) {
    console.warn(`Live catalogue unavailable (${error instanceof Error ? error.message : error}); using the build snapshot.`)
    return snapshot()
  }
}
