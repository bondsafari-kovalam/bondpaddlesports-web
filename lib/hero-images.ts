/**
 * Hero background photos for each page.
 *
 * Paths under /images/bond/ are Bond Safari's own photographs. The rest are illustrative Unsplash
 * stand-ins chosen to match the page's content; replace them with approved Bond photography as it
 * is supplied. Anything that is not a Bond photo is labelled "Illustrative image" where it appears.
 */

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2200&q=85`
const bond = (name: string) => `/images/bond/${name}.jpg`

/** True for Bond Safari's own photographs, which are shown without the "Illustrative image" label. */
export const isBondPhoto = (src: string) => src.startsWith('/images/bond/')

export const HERO_IMAGES = {
  about: bond('three-kayaks-on-the-backwater'), // Three kayaks on the backwater, palms and a bridge behind
  activities: unsplash('1593417034675-3ed7eda1bee9'), // Kerala backwaters with a boat and palms
  academy: unsplash('1689841667551-eeaee48f2247'), // Kayakers in helmets and buoyancy aids watching a paddler
  academyCourses: unsplash('1734438237000-d3a70f1e4e88'), // Paddler training in a kayak
  academyCalendar: unsplash('1771401750317-3f0143d10a4a'), // Kayaks resting on a tree-lined shore
  academyCareers: unsplash('1759521626408-4118f14632ac'), // A group of kayakers paddling together from above
  academyCertificate: unsplash('1691197672191-d07124391453'), // Canoe bow on calm water
  academyPathway: unsplash('1701815018850-eb40bfdc0ec1'), // Kayaker paddling a river through the forest
  academySchools: unsplash('1689753423166-d246faaf5a54'), // Young paddler in a helmet and buoyancy aid
  contact: bond('sharing-a-tandem-kayak'), // Two guests in life jackets paddling a tandem kayak
  gallery: bond('tandem-kayak-by-the-bridge'), // Guests kayaking on the backwater with the bridge behind
  groups: bond('setting-off-from-the-jetty'), // A group in kayaks setting off from the jetty steps
  membership: unsplash('1691027500652-f2ac352e9ab2'), // Kayaker paddling at sunset
  safety: bond('briefing-before-setting-off'), // Guests in life jackets at a briefing on the bank
  shop: unsplash('1642111852423-9d854bb6dbcd'), // Colourful kayaks racked on a wall
  account: unsplash('1769852635551-f6a97498e61e'), // Kayaks and paddleboards stacked on a beach
} as const
