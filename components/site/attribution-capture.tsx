'use client'

import { useEffect } from 'react'
import { captureAttribution } from '@/lib/attribution'

/**
 * Records UTM and partner parameters from the landing URL. Reads window.location rather than
 * useSearchParams so the static pages it sits on aren't opted out of prerendering.
 */
export function AttributionCapture() {
  useEffect(() => {
    captureAttribution(window.location.search)
  }, [])
  return null
}
