/**
 * Gallery & Reviews data.
 *
 * GALLERY_ITEMS holds approved Bond Safari photographs only (with recorded permission for any
 * identifiable guest, and parent/guardian consent for identifiable children). The first set below
 * was supplied by Bond: the Muziris Water Trails team and kayak fleet. Location and date are left
 * off until Bond confirms where and when each was taken.
 *
 * LAYOUT_PREVIEW_ITEMS are untitled art tiles (no photographs) used only when a visitor opens the
 * clearly labelled layout preview, so filters and the lightbox can be reviewed before real photos
 * arrive. They never claim to show a real place, person or event.
 *
 * REVIEWS / REVIEW_SOURCE stay empty until genuine reviews or a verified review platform are
 * connected. No ratings or counts are ever derived from sample data.
 */

export type GalleryCategoryId = 'kayaking' | 'canoeing' | 'sup' | 'locations' | 'academy' | 'groups'

export const GALLERY_CATEGORIES: { id: GalleryCategoryId; label: string }[] = [
  { id: 'kayaking', label: 'Kayaking' },
  { id: 'canoeing', label: 'Canoeing' },
  { id: 'sup', label: 'Stand-Up Paddleboarding' },
  { id: 'locations', label: 'Locations' },
  { id: 'academy', label: 'Academy' },
  { id: 'groups', label: 'Groups & Experiences' },
]

export type GalleryItem = {
  id: string
  /** Approved photograph; absent only for layout-preview tiles. */
  src?: string
  width: number
  height: number
  alt: string
  caption: string
  category: GalleryCategoryId
  /** Only when the photo's location is verified. */
  locationSlug?: string
  /** Only when the date or event is confirmed. */
  dateLabel?: string
}

/** Bond's own photographs, by name, so pages can feature them beyond the gallery. */
export const BOND_PHOTOS = {
  teamWithFleet: { id: 'team-with-kayak-fleet', src: '/images/bond/team-with-kayak-fleet.jpg', width: 1536, height: 1024, category: 'groups', caption: 'The Bond Safari team with the kayak fleet', alt: 'The Bond Safari team, many in Muziris Water Trails T-shirts, standing behind a row of colourful kayaks and yellow paddles under green trees' },
  paddlesAndBuoyancyAid: { id: 'paddles-and-buoyancy-aid', src: '/images/bond/paddles-and-buoyancy-aid.jpg', width: 2000, height: 1333, category: 'kayaking', caption: 'Paddles and a buoyancy aid, ready in the kayak', alt: 'Close-up of two yellow kayak paddles resting on a blue buoyancy aid inside a red kayak' },
  guidesCarryingKayak: { id: 'guides-carrying-kayak', src: '/images/bond/guides-carrying-kayak.jpg', width: 594, height: 464, category: 'kayaking', caption: 'Carrying the kayaks down to the water', alt: 'Bond Safari team members lifting a blue and white kayak overhead beside a backwater, with more kayaks on the ground' },
  carryingOrangeKayak: { id: 'carrying-orange-kayak', src: '/images/bond/carrying-orange-kayak.jpg', width: 704, height: 558, category: 'kayaking', caption: 'An orange kayak on its way to the launch', alt: 'A team member carrying an orange kayak overhead across a paved waterside area' },
  muzirisTeam: { id: 'muziris-water-trails-team', src: '/images/bond/muziris-water-trails-team.jpg', width: 826, height: 557, category: 'groups', caption: 'The Muziris Water Trails team', alt: 'Team members in Muziris Water Trails by Bond Safari T-shirts gathered around a green, white and orange kayak' },
  tandemByTheBridge: { id: 'tandem-kayak-by-the-bridge', src: '/images/bond/tandem-kayak-by-the-bridge.jpg', width: 1536, height: 1024, category: 'kayaking', caption: 'Out on the backwater, with the bridge behind', alt: 'Two women in orange life jackets paddling a tandem kayak, with a man in a yellow kayak behind them and a road bridge across the backwater in the distance' },
  threeKayaksOnBackwater: { id: 'three-kayaks-on-the-backwater', src: '/images/bond/three-kayaks-on-the-backwater.jpg', width: 1536, height: 1024, category: 'kayaking', caption: 'Three kayaks out on the backwater', alt: 'Three paddlers in life jackets on yellow, green and red kayaks on a wide backwater, with coconut palms and a road bridge behind' },
  soloPaddler: { id: 'solo-paddler', src: '/images/bond/solo-paddler.jpg', width: 1024, height: 1536, category: 'kayaking', caption: 'A solo paddle on open water', alt: 'A paddler in a blue buoyancy aid and sunglasses in a lime-green sit-on-top kayak, reflected in calm water' },
  sharingATandem: { id: 'sharing-a-tandem-kayak', src: '/images/bond/sharing-a-tandem-kayak.jpg', width: 1536, height: 1024, category: 'kayaking', caption: 'Sharing a tandem kayak', alt: 'Two smiling women in orange life jackets paddling a green, white and orange tandem kayak on the backwater' },
  settingOffFromJetty: { id: 'setting-off-from-the-jetty', src: '/images/bond/setting-off-from-the-jetty.jpg', width: 1536, height: 1024, category: 'groups', caption: 'Setting off from the jetty steps', alt: 'A group in life jackets paddling colourful kayaks away from stone jetty steps, with festive umbrellas and onlookers on the bank' },
  briefingBeforeSettingOff: { id: 'briefing-before-setting-off', src: '/images/bond/briefing-before-setting-off.jpg', width: 1536, height: 1024, category: 'groups', caption: 'A briefing on the bank before setting off', alt: 'Guests in orange life jackets listening as a team member holds a paddle beside a kayak on the bank, with the backwater and bridge behind' },
  teamByTheWater: { id: 'team-by-the-water', src: '/images/bond/team-by-the-water.jpg', width: 1536, height: 1024, category: 'groups', caption: 'The Bond Safari team by the water', alt: 'The Bond Safari team, most in black team T-shirts, standing on a paved waterside path with kayaks behind them' },
} satisfies Record<string, GalleryItem & { src: string }>

export const GALLERY_ITEMS: GalleryItem[] = Object.values(BOND_PHOTOS)

const preview = (id: string, category: GalleryCategoryId, caption: string, width: number, height: number): GalleryItem => ({
  id: `preview-${id}`,
  category,
  caption,
  width,
  height,
  alt: `Layout preview tile: ${caption.toLowerCase()} (not a photograph)`,
})

export const LAYOUT_PREVIEW_ITEMS: GalleryItem[] = [
  preview('1', 'kayaking', 'Finding a new perspective on the water', 4, 3),
  preview('2', 'locations', 'A day exploring Kerala’s waterways', 3, 4),
  preview('3', 'groups', 'Time outdoors, shared together', 4, 3),
  preview('4', 'sup', 'Discovering the joy of paddling', 3, 4),
  preview('5', 'canoeing', 'Sharing a canoe and the view', 16, 9),
  preview('6', 'academy', 'Learning a new skill on the water', 4, 3),
  preview('7', 'kayaking', 'Quiet water, early light', 3, 4),
  preview('8', 'locations', 'Where the backwaters open up', 4, 3),
  preview('9', 'groups', 'A team on the water', 3, 4),
]

export type Review = {
  displayName: string
  text: string
  rating?: number
  activity?: string
  locationSlug?: string
  date?: string
  source?: { name: string; url?: string }
}

export const REVIEWS: Review[] = []

/** A verified external review profile (e.g. Google Business). Summary figures must come from it. */
export const REVIEW_SOURCE: { name: string; url: string; averageRating?: number; totalReviews?: number } | undefined = undefined
