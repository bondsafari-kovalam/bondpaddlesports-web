/**
 * Background films. Each has a landscape encode for larger screens, a 540x960 portrait crop for
 * phones (roughly a quarter of the bytes, and sharper in a tall frame), and a poster image that
 * renders first and stays if the film is skipped or fails.
 *
 * `focus` / `mobileFocus` are CSS object-positions that keep the subject in frame; `mobileFocus`
 * matches where the portrait encode was cropped, so the poster and the film line up on phones.
 */
export type Film = { src: string; mobileSrc: string; poster: string; focus?: string; mobileFocus?: string }

export const FILMS = {
  kayaking: { src: '/video/kayaking-loop.mp4', mobileSrc: '/video/kayaking-loop-portrait.mp4', poster: '/video/kayaking-poster.jpg', focus: '72% 50%', mobileFocus: '72% 50%' },
  canoeing: { src: '/video/canoeing-loop.mp4', mobileSrc: '/video/canoeing-loop-portrait.mp4', poster: '/video/canoeing-poster.jpg' },
  sup: { src: '/video/sup-loop.mp4', mobileSrc: '/video/sup-loop-portrait.mp4', poster: '/video/sup-poster.jpg', focus: '62% 50%', mobileFocus: '80% 50%' },
} satisfies Record<string, Film>
