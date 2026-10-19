import { AnimatePresence, m, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { calls, companies, people, tools } from '../data/board'

// Board geometry. The wide board is the desktop composition; the narrow one is
// a portrait re-cut of the same three columns so a whole call fits a phone screen.
type Geom = {
  W: number
  H: number
  col: { company: number; tool: number; person: number }
  top: number
  bottom: number
  plateW: number
  font: number
  tracking: string
  r: number
  rc: number
  headerW: number
  headerFont: number
  readoutFont: number
  sag: number
}

const WIDE: Geom = {
  W: 640,
  H: 716,
  col: { company: 100, tool: 320, person: 540 },
  top: 138,
  bottom: 586,
  plateW: 124,
  font: 11.5,
  tracking: '0.12em',
  r: 17,
  rc: 15,
  headerW: 132,
  headerFont: 13,
  readoutFont: 13,
  sag: 64,
}

const NARROW: Geom = {
  W: 400,
  H: 690,
  col: { company: 68, tool: 200, person: 332 },
  top: 126,
  bottom: 556,
  plateW: 118,
  font: 10,
  tracking: '0.06em',
  r: 13,
  rc: 12,
  headerW: 114,
  headerFont: 11,
  readoutFont: 11,
  sag: 40,
}

function useNarrow() {
  const query = '(max-width: 599px)'
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const m = window.matchMedia(query)
    const update = () => setNarrow(m.matches)
    update()
    m.addEventListener('change', update)
    return () => m.removeEventListener('change', update)
  }, [])
  return narrow
}

function rowY(g: Geom, count: number, i: number) {
  return g.top + ((g.bottom - g.top) * i) / (count - 1)
}

function cordPath(g: Geom, x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1
  const sag = g.sag + Math.abs(y2 - y1) * 0.12
  return `M ${x1} ${y1} C ${x1 + dx * 0.32} ${y1 + sag}, ${x2 - dx * 0.32} ${y2 + sag}, ${x2} ${y2}`
}

type Phase = 0 | 1 | 2 | 3

const draw = { duration: 0.95, ease: [0.16, 1, 0.3, 1] as const }
const LABEL_FONT = 'Barlow Condensed, Arial Narrow, sans-serif'
const TICKET_FONT = 'Special Elite, Courier New, monospace'

export function PatchBay() {
  const reduced = useReducedMotion()
  const narrow = useNarrow()
  const g = narrow ? NARROW : WIDE
  const [callIdx, setCallIdx] = useState(0)
  const [phase, setPhase] = useState<Phase>(reduced ? 2 : 0)
  const [hover, setHover] = useState<number | null>(null)

  const active = hover ?? callIdx
  const call = calls[active]

  useEffect(() => {
    if (reduced) return
    let t: number | undefined
    if (phase === 0) t = window.setTimeout(() => setPhase(1), 950)
    else if (phase === 1) t = window.setTimeout(() => setPhase(2), 950)
    else if (phase === 2 && hover === null) t = window.setTimeout(() => setPhase(3), 2800)
    else if (phase === 3)
      t = window.setTimeout(() => {
        setCallIdx((i) => (i + 1) % calls.length)
        setPhase(0)
      }, 420)
    return () => window.clearTimeout(t)
  }, [phase, hover, reduced])

  // Pointer hover or keyboard focus holds a line open; a tap or click just
  // jumps the board to that company's call and lets the cycle carry on.
  function patchByHand(i: number) {
    if (hover === i) return
    setHover(i)
    setCallIdx(i)
    setPhase(reduced ? 2 : 0)
  }
  function release() {
    setHover(null)
    if (phase < 2) return
    setPhase(2)
  }
  function jumpTo(i: number) {
    if (callIdx === i && hover === null) return
    setHover(null)
    setCallIdx(i)
    setPhase(reduced ? 2 : 0)
  }

  const cx = g.col.company
  const cy = rowY(g, companies.length, call.company)
  const tx = g.col.tool
  const ty = rowY(g, tools.length, call.tool)
  const px = g.col.person
  const py = rowY(g, people.length, call.person)

  const showA = phase <= 2
  const showB = phase >= 1 && phase <= 2
  const connected = phase === 2

  const headerPlates = [
    ['Companies', g.col.company],
    ['Tools we wire', g.col.tool],
    ['People we send', g.col.person],
  ] as const

  return (
    <div className="panel p-2 sm:p-3">
      <span className="screw left-2 top-2" style={{ '--slot': '15deg' } as React.CSSProperties} />
      <span className="screw right-2 top-2" style={{ '--slot': '-40deg' } as React.CSSProperties} />
      <span className="screw bottom-2 left-2" style={{ '--slot': '70deg' } as React.CSSProperties} />
      <span className="screw bottom-2 right-2" style={{ '--slot': '-10deg' } as React.CSSProperties} />
      <svg
        viewBox={`0 0 ${g.W} ${g.H}`}
        className="block h-auto w-full"
        role="img"
        aria-labelledby="bay-title bay-desc"
      >
        <title id="bay-title">The urelimitless patch bay</title>
        <desc id="bay-desc">
          A switchboard with three columns of jacks: companies, tools and people. Cords patch a company to a tool
          to a person. Currently {companies[call.company]} is patched to {tools[call.tool]} and{' '}
          {people[call.person]}.
        </desc>
        <defs>
          <radialGradient id="brass" cx="35%" cy="30%" r="75%">
            <stop offset="0" stopColor="#e2c26f" />
            <stop offset="0.45" stopColor="#b08d3f" />
            <stop offset="1" stopColor="#6d5424" />
          </radialGradient>
          <radialGradient id="jackHole" cx="50%" cy="45%" r="60%">
            <stop offset="0" stopColor="#000" />
            <stop offset="0.7" stopColor="#120f0d" />
            <stop offset="1" stopColor="#2a2522" />
          </radialGradient>
          <radialGradient id="lampOn" cx="40%" cy="35%" r="70%">
            <stop offset="0" stopColor="#fff4c2" />
            <stop offset="0.5" stopColor="#e8b52f" />
            <stop offset="1" stopColor="#b9821a" />
          </radialGradient>
          <radialGradient id="lampOff" cx="40%" cy="35%" r="70%">
            <stop offset="0" stopColor="#6b5a36" />
            <stop offset="1" stopColor="#3a2e18" />
          </radialGradient>
          <linearGradient id="plateFill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#f6eedf" />
            <stop offset="0.6" stopColor="#efe6d6" />
            <stop offset="1" stopColor="#dfd3bb" />
          </linearGradient>
          <filter id="glow" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="5" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="cordShadow" x="-10%" y="-10%" width="120%" height="140%">
            <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#000" floodOpacity="0.55" />
          </filter>
        </defs>

        {/* Column header plates */}
        {headerPlates.map(([label, x]) => (
          <g key={label} transform={`translate(${x} ${narrow ? 64 : 84})`}>
            <rect x={-g.headerW / 2} y={-15} width={g.headerW} height={30} rx={3} fill="url(#plateFill)" />
            <rect
              x={-g.headerW / 2}
              y={-15}
              width={g.headerW}
              height={30}
              rx={3}
              fill="none"
              stroke="#000"
              strokeOpacity={0.45}
            />
            <EngravedText y={5} size={g.headerFont} weight={700} tracking="0.14em">
              {label.toUpperCase()}
            </EngravedText>
          </g>
        ))}

        {/* Cords (under the jacks, over the panel) */}
        <g filter="url(#cordShadow)">
          <AnimatePresence>
            {showA && (
              <Cord key={`a-${active}-${narrow}`} d={cordPath(g, cx, cy, tx, ty)} color="#d9452f" reduced={!!reduced} />
            )}
            {showB && (
              <Cord key={`b-${active}-${narrow}`} d={cordPath(g, tx, ty, px, py)} color="#2f8fd9" reduced={!!reduced} />
            )}
          </AnimatePresence>
        </g>

        {/* Company jacks: interactive */}
        {companies.map((name, i) => {
          const y = rowY(g, companies.length, i)
          const lit = active === i
          return (
            <g
              key={name}
              transform={`translate(${g.col.company} ${y})`}
              role="button"
              tabIndex={0}
              aria-pressed={lit}
              aria-label={`Patch ${name} through`}
              className="cursor-pointer outline-none"
              onMouseEnter={() => patchByHand(i)}
              onMouseLeave={release}
              onFocus={() => patchByHand(i)}
              onBlur={release}
              onClick={() => jumpTo(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  patchByHand(i)
                }
              }}
            >
              <Jack g={g} r={g.r} lit={lit} label={name} focusRing />
            </g>
          )
        })}

        {/* Tool jacks */}
        {tools.map((name, i) => (
          <g key={name} transform={`translate(${g.col.tool} ${rowY(g, tools.length, i)})`}>
            <Jack g={g} r={g.rc} lit={call.tool === i && phase >= 1 && phase <= 2} label={name} />
          </g>
        ))}

        {/* People jacks */}
        {people.map((name, i) => (
          <g key={name} transform={`translate(${g.col.person} ${rowY(g, people.length, i)})`}>
            <Jack g={g} r={g.r} lit={call.person === i && connected} label={name} />
          </g>
        ))}

        {/* Plugs on the live cord ends */}
        <AnimatePresence>
          {showA && (
            <m.g
              key={`plug-${active}-${phase >= 1 ? 'b' : 'a'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <circle cx={cx} cy={cy} r={narrow ? 6 : 7} fill="url(#brass)" />
              {phase >= 1 && <circle cx={tx} cy={ty} r={narrow ? 6 : 7} fill="url(#brass)" />}
              {connected && <circle cx={px} cy={py} r={narrow ? 6 : 7} fill="url(#brass)" />}
            </m.g>
          )}
        </AnimatePresence>

        {/* Ticket readout */}
        <g transform={`translate(${narrow ? 14 : 24} ${g.H - 78})`}>
          <rect width={g.W - (narrow ? 28 : 48)} height={56} rx={4} fill="#120f0d" stroke="#6d5424" strokeOpacity={0.8} />
          <circle
            cx={20}
            cy={28}
            r={6}
            fill={connected ? 'url(#lampOn)' : 'url(#lampOff)'}
            filter={connected ? 'url(#glow)' : undefined}
          />
          {narrow ? (
            <>
              <text x={38} y={23} fill={connected ? '#e8b52f' : '#a89c86'} fontFamily={TICKET_FONT} fontSize={g.readoutFont}>
                LINE 0{active + 1} · {connected ? 'CONNECTED' : 'PATCHING…'}
              </text>
              <text x={38} y={43} fill="#efe6d6" fontFamily={TICKET_FONT} fontSize={g.readoutFont}>
                {companies[call.company].toUpperCase()} → {tools[call.tool].toUpperCase()} →{' '}
                {people[call.person].toUpperCase()}
              </text>
            </>
          ) : (
            <>
              <text x={42} y={23} fill="#efe6d6" fontFamily={TICKET_FONT} fontSize={g.readoutFont}>
                LINE 0{active + 1} · {companies[call.company].toUpperCase()} → {tools[call.tool].toUpperCase()} →{' '}
                {people[call.person].toUpperCase()}
              </text>
              <text x={42} y={43} fill={connected ? '#e8b52f' : '#a89c86'} fontFamily={TICKET_FONT} fontSize={12}>
                {connected ? 'CONNECTED' : 'PATCHING…'} · {call.need}
              </text>
            </>
          )}
        </g>
      </svg>
    </div>
  )
}

function EngravedText({
  y,
  size,
  weight,
  tracking,
  children,
}: {
  y: number
  size: number
  weight: number
  tracking: string
  children: string
}) {
  const common = { textAnchor: 'middle' as const, fontFamily: LABEL_FONT, fontWeight: weight, fontSize: size, letterSpacing: tracking }
  return (
    <>
      <text {...common} y={y - 1} fill="#000" fillOpacity={0.45}>
        {children}
      </text>
      <text {...common} y={y + 1} fill="#fff" fillOpacity={0.8}>
        {children}
      </text>
      <text {...common} y={y} fill="#16130f">
        {children}
      </text>
    </>
  )
}

function Cord({ d, color, reduced }: { d: string; color: string; reduced: boolean }) {
  return (
    <m.g initial={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.35 } }}>
      <m.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={8}
        strokeLinecap="round"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={draw}
      />
      {/* cloth braid: alternating dark and light wraps around the cord */}
      <m.path
        d={d}
        fill="none"
        stroke="#000"
        strokeOpacity={0.4}
        strokeWidth={8}
        strokeLinecap="butt"
        strokeDasharray="4 8"
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={draw}
      />
      <m.path
        d={d}
        fill="none"
        stroke="#fff"
        strokeOpacity={0.5}
        strokeWidth={3}
        strokeLinecap="butt"
        strokeDasharray="4 8"
        strokeDashoffset={-6}
        initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={draw}
        style={{ translateY: -2 }}
      />
    </m.g>
  )
}

function Jack({ g, r, lit, label, focusRing }: { g: Geom; r: number; lit: boolean; label: string; focusRing?: boolean }) {
  const w = g.plateW
  return (
    <>
      {focusRing && (
        <circle r={r + 7} fill="none" stroke="#e8b52f" strokeWidth={2} className="opacity-0 [g:focus-visible>&]:opacity-100" />
      )}
      <circle r={r + 4} fill="#0d0b0a" opacity={0.6} />
      <circle r={r} fill="url(#brass)" />
      <circle r={r - 5} fill="url(#jackHole)" />
      <circle r={Math.max(2, r - 11)} fill="#000" />
      {/* jewel lamp, upper right */}
      <circle
        cx={r + 6}
        cy={-r + 2}
        r={5}
        fill={lit ? 'url(#lampOn)' : 'url(#lampOff)'}
        stroke="#6d5424"
        strokeWidth={1.5}
        filter={lit ? 'url(#glow)' : undefined}
      />
      {/* label plate */}
      <rect x={-w / 2} y={r + 9} width={w} height={22} rx={2} fill="url(#plateFill)" />
      <rect x={-w / 2} y={r + 9} width={w} height={22} rx={2} fill="none" stroke="#000" strokeOpacity={0.45} />
      <EngravedText y={r + 24} size={g.font} weight={600} tracking={g.tracking}>
        {label.toUpperCase()}
      </EngravedText>
    </>
  )
}
