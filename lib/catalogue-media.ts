/**
 * Website-only media for catalogue entries, keyed by slug. Activity and location CONTENT comes from the backend
 * (lib/generated/catalogue.json, refreshed by scripts/sync-catalogue.mjs); photos and films stay in /public and are
 * matched here, so images never need uploading to shared storage. `illustrative: true` marks stand-in photos.
 * Add an entry when a new activity or location gets approved photography.
 */
import type { LocationImage } from '@/lib/locations'
import { FILMS, type Film } from '@/lib/media'

export type LocationMedia = { image?: LocationImage; gallery?: LocationImage[] }
export type ActivityMedia = { image?: LocationImage; video?: { src: string; captions: string }; ambientVideo?: Film }

export const LOCATION_MEDIA: Record<string, LocationMedia> = {
    "muziris-kottapuram": {
      "image": {
        "src": "/images/bond/paddling-under-monsoon-skies.jpg",
        "alt": "Two paddlers in red and yellow kayaks on the backwater, with coconut palms under monsoon clouds"
      }
    },
    "muziris-north-paravur": {
      "image": {
        "src": "https://images.unsplash.com/photo-1554200429-bd32416aca62?auto=format&fit=crop&w=1600&q=85",
        "alt": "Illustrative image of two people paddling a tandem kayak near Paravoor, Kerala",
        "illustrative": true
      }
    },
    "kovalam": {
      "image": {
        "src": "/images/bond/red-kayak-at-the-shoreline-from-above.jpg",
        "alt": "A paddler lying back in a red kayak where the waves meet the sand, seen from above"
      }
    },
    "poovar": {
      "image": {
        "src": "https://images.unsplash.com/photo-1516428516769-3056248b7f97?auto=format&fit=crop&w=1600&q=85",
        "alt": "Illustrative image of a kayak bow on calm open water",
        "illustrative": true
      }
    }
  }

export const ACTIVITY_MEDIA: Record<string, ActivityMedia> = {
  "kayaking": { ...{
      "image": {
        "src": "/images/bond/afternoon-paddle-by-the-reeds.jpg",
        "alt": "A paddler in a sun hat resting in an orange kayak beside the reeds in afternoon light"
      }
    }, ambientVideo: FILMS.kayaking },
  "canoeing": { ...{
      "image": {
        "src": "https://images.unsplash.com/photo-1635749687861-4341928cbf97?auto=format&fit=crop&w=1400&q=85",
        "alt": "Paddler in a canoe on quiet, calm water",
        "illustrative": true
      }
    }, ambientVideo: FILMS.canoeing },
  "stand-up-paddleboarding": { ...{
      "image": {
        "src": "/images/bond/sup-paddling-at-sunset.jpg",
        "alt": "A paddler on a stand-up paddleboard pulling a stroke as the sun sets behind a rocky headland"
      }
    }, ambientVideo: FILMS.sup },
  "guided-trails": { ...{
      "image": {
        "src": "https://images.unsplash.com/photo-1533690117405-12bd19ce56e3?auto=format&fit=crop&w=1400&q=85",
        "alt": "Illustrative kayak trail through a mangrove waterway",
        "illustrative": true
      }
    } },
  "sunrise-paddles": { ...{
      "image": {
        "src": "https://images.unsplash.com/photo-1647036003499-94eebb3388c7?auto=format&fit=crop&w=1400&q=85",
        "alt": "Illustrative canoe paddle on a lake at sunrise",
        "illustrative": true
      }
    } },
  "sunset-paddles": { ...{
      "image": {
        "src": "/images/bond/resting-on-a-sup-at-sunset.jpg",
        "alt": "A swimmer resting on a stand-up paddleboard as the sea turns orange at sunset"
      }
    } },
  "private-sessions": { ...{
      "image": {
        "src": "https://images.unsplash.com/photo-1723215629906-bc05bd6f36a1?auto=format&fit=crop&w=1400&q=85",
        "alt": "Illustrative group gathered on kayaks in the water",
        "illustrative": true
      }
    } },
  "white-water": { ...{
      "image": {
        "src": "https://images.unsplash.com/photo-1767471716671-60052b672451?auto=format&fit=crop&w=1400&q=85",
        "alt": "Illustrative kayaker navigating white-water rapids",
        "illustrative": true
      }
    } },
}
