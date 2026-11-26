/**
 * Live membership catalogue for the /membership page (server only): GET /membership on the Bond backend, cached for
 * MEMBERSHIP_REVALIDATE_SECONDS, so admin changes appear within a minute without a rebuild. Falls back to the build
 * snapshot when the API is not configured or unreachable.
 */

import { SNAPSHOT_MEMBERSHIP, toMembershipData, type ApiMembership, type MembershipData } from '@/lib/membership'

export const MEMBERSHIP_REVALIDATE_SECONDS = 60

const API = (process.env.BOND_API_URL || process.env.NEXT_PUBLIC_BOND_API_URL || '').replace(/\/+$/, '')

export async function getLiveMembership(): Promise<MembershipData> {
  if (!API) return SNAPSHOT_MEMBERSHIP
  try {
    const response = await fetch(`${API}/membership`, {
      headers: { accept: 'application/json' },
      next: { revalidate: MEMBERSHIP_REVALIDATE_SECONDS },
      signal: AbortSignal.timeout(10_000),
    })
    if (!response.ok) throw new Error(`HTTP ${response.status}`)
    return toMembershipData(((await response.json()) as { data: ApiMembership }).data)
  } catch (error) {
    console.warn(`Live membership catalogue unavailable (${error instanceof Error ? error.message : error}); using the build snapshot.`)
    return SNAPSHOT_MEMBERSHIP
  }
}
