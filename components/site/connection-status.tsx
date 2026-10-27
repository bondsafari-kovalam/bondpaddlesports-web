'use client'

import { useEffect, useState } from 'react'
import { RefreshCw, WifiOff } from 'lucide-react'

/**
 * A quiet notice when the connection drops, and a short confirmation when it returns. Uses the
 * browser's online/offline events rather than connection-speed hints, which not every browser has.
 */
export function ConnectionStatus() {
  const [state, setState] = useState<'online' | 'offline' | 'restored'>('online')

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const offline = () => { clearTimeout(timer); setState('offline') }
    const online = () => { setState('restored'); timer = setTimeout(() => setState('online'), 4000) }
    if (!navigator.onLine) offline()
    window.addEventListener('offline', offline)
    window.addEventListener('online', online)
    return () => { clearTimeout(timer); window.removeEventListener('offline', offline); window.removeEventListener('online', online) }
  }, [])

  if (state === 'online') return null
  return (
    <div role="status" aria-live="polite" className="fixed inset-x-4 bottom-24 z-50 mx-auto flex max-w-md items-start gap-3 rounded-2xl bg-ink p-4 text-sm text-white shadow-xl sm:bottom-6">
      {state === 'offline' ? (
        <>
          <WifiOff className="mt-0.5 size-5 shrink-0 text-sand" aria-hidden />
          <p className="flex-1"><span className="font-semibold">You’re offline.</span> <span className="text-white/75">Pages you’ve opened still work, and anything you’ve typed stays on this page. Images and videos will load when you’re back online.</span></p>
        </>
      ) : (
        <>
          <RefreshCw className="mt-0.5 size-5 shrink-0 text-teal-pale" aria-hidden />
          <p className="flex-1 font-semibold">You’re back online.</p>
        </>
      )}
    </div>
  )
}
