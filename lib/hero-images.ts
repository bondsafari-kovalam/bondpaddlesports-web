/**
 * Hero background photos for each page.
 *
 * Every hero uses Bond Safari's own photographs under /images/bond/. Any other source passed to a
 * hero is labelled "Illustrative image" where it appears.
 */

const bond = (name: string) => `/images/bond/${name}.jpg`

/** True for Bond Safari's own photographs, which are shown without the "Illustrative image" label. */
export const isBondPhoto = (src: string) => src.startsWith('/images/bond/')

export const HERO_IMAGES = {
  about: bond('three-kayaks-on-the-backwater'), // Three kayaks on the backwater, palms and a bridge behind
  activities: bond('paddling-under-monsoon-skies'), // Two paddlers on the backwater under monsoon clouds
  academy: bond('touring-kayaks-at-the-waters-edge'), // Touring kayaks and paddles lined up at the water’s edge
  academyCourses: bond('afternoon-paddle-by-the-reeds'), // A paddler resting in an orange kayak by the reeds, paddle in hand
  academyCalendar: bond('sup-board-on-the-beach-at-sunset'), // A paddleboard waiting on the sand at sunset
  academyCareers: bond('carrying-a-sup-to-the-water'), // A paddler carrying a board along the boardwalk to the sea
  academyCertificate: bond('red-kayak-bow-on-open-water'), // Red kayak bow on open water
  academyPathway: bond('sup-among-the-lily-pads'), // A paddleboarder on a quiet channel through lily pads, from above
  academySchools: bond('two-touring-kayaks-from-above'), // Two touring kayaks ready on the sand, from above
  contact: bond('sharing-a-tandem-kayak'), // Two guests in life jackets paddling a tandem kayak
  gallery: bond('tandem-kayak-by-the-bridge'), // Guests kayaking on the backwater with the bridge behind
  groups: bond('setting-off-from-the-jetty'), // A group in kayaks setting off from the jetty steps
  membership: bond('swimmer-beside-yellow-kayak'), // A swimmer resting beside a yellow kayak, palms behind
  safety: bond('briefing-before-setting-off'), // Guests in life jackets at a briefing on the bank
  shop: bond('mkel-kayak-range-studio'), // MKEL touring and expedition kayaks in the studio
  account: bond('two-touring-kayaks-from-above'), // Two touring kayaks on the sand, from above
} as const
