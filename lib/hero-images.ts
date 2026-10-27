/**
 * Hero background photos for each page.
 *
 * All are illustrative Unsplash stand-ins chosen to match the page's content; replace them with
 * approved Bond Safari photography as it is supplied.
 */

const unsplash = (id: string) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=2200&q=85`

export const HERO_IMAGES = {
  about: unsplash('1609828913552-f9138ed9e42d'), // Kerala backwaters lined with coconut palms
  activities: unsplash('1593417034675-3ed7eda1bee9'), // Kerala backwaters with a boat and palms
  academy: unsplash('1689841667551-eeaee48f2247'), // Kayakers in helmets and buoyancy aids watching a paddler
  academyCourses: unsplash('1734438237000-d3a70f1e4e88'), // Paddler training in a kayak
  academyCalendar: unsplash('1771401750317-3f0143d10a4a'), // Kayaks resting on a tree-lined shore
  academyCareers: unsplash('1759521626408-4118f14632ac'), // A group of kayakers paddling together from above
  academyCertificate: unsplash('1691197672191-d07124391453'), // Canoe bow on calm water
  academyPathway: unsplash('1701815018850-eb40bfdc0ec1'), // Kayaker paddling a river through the forest
  academySchools: unsplash('1689753423166-d246faaf5a54'), // Young paddler in a helmet and buoyancy aid
  contact: unsplash('1499936324534-c3e0da6694eb'), // Kayaks on the shore, ready to launch
  gallery: unsplash('1647036003492-a74531750323'), // View from a kayak across a still lake
  groups: unsplash('1769980892425-59c1752f0b6c'), // A group launching kayaks at sunset
  membership: unsplash('1691027500652-f2ac352e9ab2'), // Kayaker paddling at sunset
  safety: unsplash('1780049503868-76af0eccd11b'), // Life jackets and a kayak ready by the water
  shop: unsplash('1642111852423-9d854bb6dbcd'), // Colourful kayaks racked on a wall
  account: unsplash('1769852635551-f6a97498e61e'), // Kayaks and paddleboards stacked on a beach
} as const
