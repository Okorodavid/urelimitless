import { useEffect, useRef } from 'react'
import { WORDMARK } from './Logo'
import { mountLogoMotion } from './logoMotion'

// The horizontal logo with the bot playing its 14 s glow loop, for the header.
// Use one instance per page. `?logo=<seconds>` in the URL freezes a frame (for checking the artwork).
export function LogoPlay({ className = '' }: { className?: string }) {
  const symbol = useRef<SVGGElement>(null)

  useEffect(() => {
    const root = symbol.current
    if (!root) return
    const frame = mountLogoMotion(root, { u: 'currentColor', bot: '#E8B52F', bg: '#1D1B19' }, 'ubot')
    const frozen = new URLSearchParams(location.search).get('logo')
    if (frozen !== null) return frame(parseFloat(frozen) || 0)
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return frame(0)

    let raf = 0
    let t0 = performance.now()
    let pausedAt = 0
    const tick = (now: number) => {
      frame((now - t0) / 1000)
      raf = requestAnimationFrame(tick)
    }
    const onVisibility = () => {
      if (document.hidden) {
        pausedAt = performance.now()
        cancelAnimationFrame(raf)
      } else {
        t0 += performance.now() - pausedAt
        raf = requestAnimationFrame(tick)
      }
    }
    raf = requestAnimationFrame(tick)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <svg viewBox="0 0 1027 256" aria-hidden className={`block w-auto shrink-0 overflow-visible ${className}`}>
      <g ref={symbol} transform="translate(18.5,23.5) scale(0.92)" />
      <path transform="translate(296,50.5) scale(0.62)" fill="currentColor" fillRule="evenodd" d={WORDMARK} />
    </svg>
  )
}
