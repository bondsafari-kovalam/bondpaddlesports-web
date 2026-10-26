/**
 * Gallery & Reviews data.
 *
 * GALLERY_ITEMS holds approved Bond Safari photographs only (with recorded permission for any
 * identifiable guest, and parent/guardian consent for identifiable children). None have been
 * supplied yet, so the public gallery shows an empty state.
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

export const GALLERY_ITEMS: GalleryItem[] = []

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
