import { m, useReducedMotion } from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'

const steps = [
  {
    title: 'You ring',
    body: 'Tell the operator what you need in plain words. Four lines on a ticket is enough; we ask the rest on the call.',
    ticket: 'NEED: answer customer email in our tone. Human approves refunds.',
  },
  {
    title: 'We patch',
    body: 'We pick the tools and the people for the job and send you the line: who, what it will take, how long.',
    ticket: 'PATCHED: Claude + Gmail API → agent engineer. Est. 3 weeks.',
  },
  {
    title: 'They deliver, you approve',
    body: 'The work ships in the open, with a human gate on anything risky, the same way our own agents are built.',
    ticket: 'DELIVERED: live on your inbox. Refund approvals: 100% human.',
  },
]

type Pt = { x: number; y: number }

export function HowItWorks() {
  const reduced = useReducedMotion()
  const listRef = useRef<HTMLOListElement>(null)
  const jackRefs = useRef<(SVGSVGElement | null)[]>([])
  const [geom, setGeom] = useState<{ w: number; h: number; d: string } | null>(null)

  // Measure the jack centres and route the cord through them, sagging into the
  // empty band beside each jack rather than across the copy below.
  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) return
    const measure = () => {
      const box = list.getBoundingClientRect()
      const pts: Pt[] = jackRefs.current
        .filter((el): el is SVGSVGElement => !!el)
        .map((el) => {
          const r = el.getBoundingClientRect()
          return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 }
        })
      if (pts.length < 2) return setGeom(null)
      const horizontal = Math.abs(pts[1].y - pts[0].y) < 40
      if (!horizontal) return setGeom(null) // stacked on small screens: no cord
      let d = `M ${pts[0].x} ${pts[0].y}`
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1]
        const b = pts[i]
        const dx = b.x - a.x
        d += ` C ${a.x + dx * 0.3} ${a.y + 42}, ${b.x - dx * 0.3} ${b.y + 42}, ${b.x} ${b.y}`
      }
      setGeom({ w: box.width, h: box.height, d })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(list)
    return () => ro.disconnect()
  }, [])

  return (
    <section id="how" className="border-t border-brass/30 bg-bakelite-deep/60">
      <div className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
        <h2 className="display max-w-[22ch] text-[2.8rem] text-cream sm:text-[3.6rem]">How a call goes through.</h2>

        <ol ref={listRef} className="relative mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {geom && (
            <svg
              className="pointer-events-none absolute left-0 top-0"
              width={geom.w}
              height={geom.h}
              viewBox={`0 0 ${geom.w} ${geom.h}`}
              aria-hidden
            >
              <m.path
                d={geom.d}
                fill="none"
                stroke="#e8b52f"
                strokeWidth={6}
                strokeLinecap="round"
                initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
              />
              <m.path
                d={geom.d}
                fill="none"
                stroke="#fff"
                strokeOpacity={0.35}
                strokeWidth={2.5}
                strokeDasharray="3 6"
                strokeLinecap="round"
                initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
                style={{ translateY: -1.5 }}
              />
            </svg>
          )}

          {steps.map((s, i) => (
            <m.li
              key={s.title}
              className="relative"
              initial={reduced ? false : { opacity: 0, y: 16 }}
              whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.3 + i * 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <StationJack
                ref={(el) => {
                  jackRefs.current[i] = el
                }}
              />
              <h3 className="display mt-5 text-[2rem] text-cream sm:text-[2.4rem]">{s.title}</h3>
              <p className="mt-3 max-w-[30rem] text-cream-dim">{s.body}</p>
              <p className="ticket mt-4 inline-block rounded-sm border border-brass/40 bg-bakelite-deep px-3 py-2 text-[0.85rem] text-amber">
                <span className="text-cream-mute">Example · </span>
                {s.ticket}
              </p>
            </m.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

function StationJack({ ref }: { ref: (el: SVGSVGElement | null) => void }) {
  return (
    <svg ref={ref} width="52" height="52" viewBox="0 0 52 52" aria-hidden className="relative shrink-0">
      <defs>
        <radialGradient id="stationBrass" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#e2c26f" />
          <stop offset="0.45" stopColor="#b08d3f" />
          <stop offset="1" stopColor="#6d5424" />
        </radialGradient>
      </defs>
      <circle cx="26" cy="26" r="24" fill="#0d0b0a" opacity="0.6" />
      <circle cx="26" cy="26" r="19" fill="url(#stationBrass)" />
      <circle cx="26" cy="26" r="13" fill="#120f0d" />
      <circle cx="26" cy="26" r="6" fill="#000" />
      <circle cx="26" cy="26" r="7" fill="url(#stationBrass)" />
    </svg>
  )
}
