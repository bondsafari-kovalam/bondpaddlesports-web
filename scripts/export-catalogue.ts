/**
 * One-time export of the website's hard-coded catalogue (lib/activities.ts, lib/locations.ts) to JSON, so the backend
 * can import it (bondpaddlesports-admin: npm run catalogue:import -- <file>). Afterwards the backend is the source of
 * truth and the website reads the catalogue from the public API (scripts/sync-catalogue.mjs).
 *
 * Run from this folder with the backend's tsx (it understands the @/ path alias):
 *   node ../bondpaddlesports-admin/node_modules/tsx/dist/cli.mjs --tsconfig tsconfig.json scripts/export-catalogue.ts out.json
 *
 * Images and films are NOT exported: they stay in /public and are matched to activities/locations by slug.
 */
import { writeFileSync } from 'node:fs'
import { activities, offeringPrice, waterTypesFor } from '../lib/activities'
import { locations } from '../lib/locations'

const out = process.argv[2]
if (!out) {
  console.error('usage: export-catalogue.ts <output.json>')
  process.exit(1)
}

const data = {
  exportedAt: new Date().toISOString(),
  locations: locations.map((location) => ({
    slug: location.slug,
    name: location.name,
    status: location.status,
    region: location.region,
    context: location.context,
    waterTypes: location.waterTypes,
    summary: location.summary ?? null,
    operatingSince: location.operatingSince ?? null,
    plannedOpening: location.plannedOpening ?? null,
    phase: location.phase ?? null,
    meetingPoint: location.meetingPoint ?? null,
    startingPrice: location.startingPrice ?? null,
    hasDetailPage: location.hasDetailPage,
    coordinates: location.coordinates ?? null,
    map: location.map ?? null,
    visitorInfo: location.visitorInfo,
    listedActivities: location.activities.map((activity) => activity.id),
    relatedExperiences: location.relatedExperiences ?? [],
  })),
  activities: activities.map((activity, index) => ({
    slug: activity.slug,
    name: activity.name,
    category: activity.category,
    tags: activity.tags,
    summary: activity.summary,
    description: activity.description ?? null,
    durationMinutes: activity.durationMinutes ?? null,
    skillLevel: activity.skillLevel ?? null,
    groupSize: activity.groupSize ?? null,
    sessionFormat: activity.sessionFormat ?? null,
    swimmingRequirement: activity.swimmingRequirement ?? null,
    healthRequirement: activity.healthRequirement ?? null,
    experienceHighlights: activity.experienceHighlights ?? [],
    learningOutcomes: activity.learningOutcomes ?? [],
    inclusions: activity.inclusions ?? [],
    whatToBring: activity.whatToBring ?? [],
    safety: activity.safety ?? null,
    related: activity.related,
    nextSteps: activity.nextSteps,
    faqs: activity.faqs,
    featured: activity.featured ?? false,
    seo: activity.seo ?? null,
    sortOrder: index * 10,
    waterTypes: waterTypesFor(activity),
    offerings: activity.offerings.map((offering) => ({
      locationSlug: offering.locationSlug,
      source: offering.source,
      // Same rule the website uses today (demo pairings borrow the location's "from" price).
      price: offeringPrice(offering) ?? null,
      duration: offering.duration ?? null,
      meetingPoint: offering.meetingPoint ?? null,
    })),
  })),
}

writeFileSync(out, `${JSON.stringify(data, null, 2)}\n`)
console.log(`Exported ${data.locations.length} locations and ${data.activities.length} activities to ${out}`)
