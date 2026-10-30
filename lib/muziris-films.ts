/**
 * The two Muziris boat tour films, one per Muziris operating location.
 *
 * `original` is the file Bond supplied, kept locally in media-masters/ (git-ignored: each is
 * ~115 MB, over GitHub's limit) and never served to visitors. Pages play web encodes cut from
 * it with no edits: 720x1280 (~2.5 Mbps) by default and 480x854 (~0.9 Mbps) for data-saver or
 * slow connections. Thumbnails and posters are frames from
 * the film itself (Paravur at 0:50, Kottapuram at 0:39).
 *
 * The mapping below is fixed by Bond: the "Reel 01" film is Paravur (Ernakulam) and the
 * "Kodungallur" film is Kottapuram (Thrissur). Don't swap them. Copy describes what the footage
 * shows; add dates or event details only once Bond supplies them.
 */
export type TourFilm = {
  id: string
  locationSlug: string
  title: string
  place: string
  district: 'Ernakulam' | 'Thrissur'
  description: string
  milestone: string
  original: string
  src: string
  lowSrc: string
  thumb: string
  poster: string
  duration: string
}

export const MUZIRIS_FILMS: TourFilm[] = [
  {
    id: 'muziris-paravur',
    locationSlug: 'muziris-north-paravur',
    title: 'Muziris Heritage Boat Tour — Paravur, Ernakulam',
    place: 'Paravur',
    district: 'Ernakulam',
    description: 'The heritage boat and kayaks on the backwaters of North Paravur, from the jetty to open water.',
    milestone: 'Launch of operations at our Muziris location in North Paravur, Ernakulam district.',
    original: 'media-masters/Bond Safari-Muziris Heritage Boat Tour Reel 01.mp4',
    src: '/video/muziris-paravur-720p.mp4',
    lowSrc: '/video/muziris-paravur-480p.mp4',
    thumb: '/video/muziris-paravur-thumb.jpg',
    poster: '/video/muziris-paravur-poster.jpg',
    duration: '1:00',
  },
  {
    id: 'muziris-kottapuram',
    locationSlug: 'muziris-kottapuram',
    title: 'Muziris Heritage Boat Tour — Kottapuram, Thrissur',
    place: 'Kottapuram',
    district: 'Thrissur',
    description: 'The tour boat on the Kottapuram waterways, past heritage sites, with kayaks setting off from the steps.',
    milestone: 'Launch of operations at our Muziris location in Kottapuram, Thrissur district.',
    original: 'media-masters/Bond Safari Muziris Boat Tour Kodungallur 01.mp4',
    src: '/video/muziris-kottapuram-720p.mp4',
    lowSrc: '/video/muziris-kottapuram-480p.mp4',
    thumb: '/video/muziris-kottapuram-thumb.jpg',
    poster: '/video/muziris-kottapuram-poster.jpg',
    duration: '1:00',
  },
]

export const getTourFilm = (locationSlug: string) => MUZIRIS_FILMS.find((film) => film.locationSlug === locationSlug)
