'use client'

import { useState } from 'react'
import Image, { type ImageProps } from 'next/image'
import { Waves } from 'lucide-react'

/**
 * next/image (responsive AVIF/WebP, lazy by default) with an on-brand fallback when the request
 * fails, e.g. offline, a dropped connection, or a removed file, so a broken-image icon never shows.
 */
export function SmartImage({ className = '', onError, ...props }: ImageProps) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span
        role={props.alt ? 'img' : undefined}
        aria-label={props.alt || undefined}
        aria-hidden={props.alt ? undefined : true}
        className={`flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,var(--color-ink-muted),var(--color-ink)_70%)] ${props.fill ? 'absolute inset-0' : ''} ${className}`}
      >
        <Waves className="size-8 text-teal-bright/60" strokeWidth={1.3} aria-hidden />
      </span>
    )
  }
  return <Image {...props} className={className} onError={(event) => { setFailed(true); onError?.(event) }} />
}
