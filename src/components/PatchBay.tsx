import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import { calls, companies, people, tools } from '../data/board'

const W = 640
const H = 716
const COL = { company: 100, tool: 320, person: 540 }
const TOP = 138
const BOTTOM = 586

function rowY(count: number, i: number) {
  return TOP + ((BOTTOM - TOP) * i) / (count - 1)
}

function cordPath(x1: number, y1: number, x2: number, y2: number) {
  const dx = x2 - x1
  const sag = 64 + Math.abs(y2 - y1) * 0.12
  return `M ${x1} ${y1} C ${x1 + dx * 0.32} ${y1 + sag}, ${x2 - dx * 0.32} ${y2 + sag}, ${x2} ${y2}`
}

type Phase = 0 | 1 | 2 | 3

const draw = { duration: 0.95, ease: [0.16, 1, 0.3, 1] as const }

export function PatchBay() {
  const reduced = useReducedMotion()
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

  const cx = COL.company
  const cy = rowY(companies.length, call.company)
  const tx = COL.tool
  const ty = rowY(tools.length, call.tool)
  const px = COL.person
  const py = rowY(people.length, call.person)

  const showA = phase <= 2
  const showB = phase >= 1 && phase <= 2
  const connected = phase === 2

  return (
    <div className="panel p-2 sm:p-3">
      <span className="screw left-2 top-2" style={{ '--slot': '15deg' } as React.CSSProperties} />
      <span className="screw right-2 top-2" style={{ '--slot': '-40deg' } as React.CSSProperties} />
      <span className="screw bottom-2 left-2" style={{ '--slot': '70deg' } as React.CSSProperties} />
      <span className="screw bottom-2 right-2" style={{ '--slot': '-10deg' } as React.CSSProperties} />
      <div className="overflow-x-auto overscroll-x-contain">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="block h-auto w-full min-w-[520px]"
          role="img"
          aria-labelledby="bay-title bay-desc"
        >
          <title id="bay-title">The urelimitless patch bay</title>
          <desc id="bay-desc">
            A switchboard with three columns of jacks: companies, tools and people. Cords patch a company to a
            tool to a person. Currently {companies[call.company]} is patched to {tools[call.tool]} and{' '}
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
          {(
            [
              ['Companies', COL.company],
              ['Tools we wire', COL.tool],
              ['People we send', COL.person],
            ] as const
          ).map(([label, x]) => (
            <g key={label} transform={`translate(${x} 84)`}>
              <rect x={-66} y={-15} width={132} height={30} rx={3} fill="url(#plateFill)" />
              <rect x={-66} y={-15} width={132} height={30} rx={3} fill="none" stroke="#000" strokeOpacity={0.45} />
              <text textAnchor="middle" y={4} fill="#000" fillOpacity={0.45} fontFamily="Barlow Condensed, Arial Narrow, sans-serif" fontWeight={700} fontSize={13} letterSpacing="0.16em">
                {label.toUpperCase()}
              </text>
              <text textAnchor="middle" y={6} fill="#fff" fillOpacity={0.8} fontFamily="Barlow Condensed, Arial Narrow, sans-serif" fontWeight={700} fontSize={13} letterSpacing="0.16em">
                {label.toUpperCase()}
              </text>
              <text
                textAnchor="middle"
                y={5}
                fill="#16130f"
                fontFamily="Barlow Condensed, Arial Narrow, sans-serif"
                fontWeight={700}
                fontSize={13}
                letterSpacing="0.16em"
              >
                {label.toUpperCase()}
              </text>
            </g>
          ))}

          {/* Cords (under the jacks, over the panel) */}
          <g filter="url(#cordShadow)">
            <AnimatePresence>
              {showA && (
                <Cord key={`a-${active}`} d={cordPath(cx, cy, tx, ty)} color="#d9452f" reduced={!!reduced} />
              )}
              {showB && (
                <Cord key={`b-${active}`} d={cordPath(tx, ty, px, py)} color="#2f8fd9" reduced={!!reduced} />
              )}
            </AnimatePresence>
          </g>

          {/* Company jacks: interactive */}
          {companies.map((name, i) => {
            const y = rowY(companies.length, i)
            const lit = active === i
            return (
              <g
                key={name}
                transform={`translate(${COL.company} ${y})`}
                role="button"
                tabIndex={0}
                aria-pressed={lit}
                aria-label={`Patch ${name} through`}
                className="cursor-pointer outline-none"
                onMouseEnter={() => patchByHand(i)}
                onMouseLeave={release}
                onFocus={() => patchByHand(i)}
                onBlur={release}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    patchByHand(i)
                  }
                }}
              >
                <Jack lit={lit} label={name} focusRing />
              </g>
            )
          })}

          {/* Tool jacks */}
          {tools.map((name, i) => (
            <g key={name} transform={`translate(${COL.tool} ${rowY(tools.length, i)})`}>
              <Jack lit={call.tool === i && phase >= 1 && phase <= 2} label={name} compact />
            </g>
          ))}

          {/* People jacks */}
          {people.map((name, i) => (
            <g key={name} transform={`translate(${COL.person} ${rowY(people.length, i)})`}>
              <Jack lit={call.person === i && connected} label={name} />
            </g>
          ))}

          {/* Plugs on the live cord ends */}
          <AnimatePresence>
            {showA && (
              <motion.g
                key={`plug-${active}-${phase >= 1 ? 'b' : 'a'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <circle cx={cx} cy={cy} r={7} fill="url(#brass)" />
                {phase >= 1 && <circle cx={tx} cy={ty} r={7} fill="url(#brass)" />}
                {connected && <circle cx={px} cy={py} r={7} fill="url(#brass)" />}
              </motion.g>
            )}
          </AnimatePresence>

          {/* Ticket readout */}
          <g transform={`translate(24 ${H - 78})`}>
            <rect width={W - 48} height={56} rx={4} fill="#120f0d" stroke="#6d5424" strokeOpacity={0.8} />
            <circle cx={22} cy={28} r={6} fill={connected ? 'url(#lampOn)' : 'url(#lampOff)'} filter={connected ? 'url(#glow)' : undefined} />
            <text
              x={42}
              y={23}
              fill="#efe6d6"
              fontFamily="Special Elite, Courier New, monospace"
              fontSize={13}
            >
              LINE 0{active + 1} · {companies[call.company].toUpperCase()} → {tools[call.tool].toUpperCase()} →{' '}
              {people[call.person].toUpperCase()}
            </text>
            <text
              x={42}
              y={43}
              fill={connected ? '#e8b52f' : '#a89c86'}
              fontFamily="Special Elite, Courier New, monospace"
              fontSize={12}
            >
              {connected ? 'CONNECTED' : 'PATCHING…'} · {call.need}
            </text>
          </g>
        </svg>
      </div>
    </div>
  )
}

function Cord({ d, color, reduced }: { d: string; color: string; reduced: boolean }) {
  return (
    <motion.g
      initial={reduced ? { opacity: 1 } : { opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35 } }}
    >
      <motion.path
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
      <motion.path
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
      <motion.path
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
    </motion.g>
  )
}

function Jack({
  lit,
  label,
  compact,
  focusRing,
}: {
  lit: boolean
  label: string
  compact?: boolean
  focusRing?: boolean
}) {
  const r = compact ? 15 : 17
  return (
    <>
      {focusRing && (
        <circle r={r + 7} fill="none" stroke="#e8b52f" strokeWidth={2} className="opacity-0 [g:focus-visible>&]:opacity-100" />
      )}
      <circle r={r + 4} fill="#0d0b0a" opacity={0.6} />
      <circle r={r} fill="url(#brass)" />
      <circle r={r - 5} fill="url(#jackHole)" />
      <circle r={r - 11} fill="#000" />
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
      <rect x={-62} y={r + 9} width={124} height={22} rx={2} fill="url(#plateFill)" />
      <rect x={-62} y={r + 9} width={124} height={22} rx={2} fill="none" stroke="#000" strokeOpacity={0.45} />
      <text textAnchor="middle" y={r + 23} fill="#000" fillOpacity={0.45} fontFamily="Barlow Condensed, Arial Narrow, sans-serif" fontWeight={600} fontSize={11.5} letterSpacing="0.12em">
        {label.toUpperCase()}
      </text>
      <text textAnchor="middle" y={r + 25} fill="#fff" fillOpacity={0.8} fontFamily="Barlow Condensed, Arial Narrow, sans-serif" fontWeight={600} fontSize={11.5} letterSpacing="0.12em">
        {label.toUpperCase()}
      </text>
      <text
        textAnchor="middle"
        y={r + 24}
        fill="#16130f"
        fontFamily="Barlow Condensed, Arial Narrow, sans-serif"
        fontWeight={600}
        fontSize={11.5}
        letterSpacing="0.12em"
      >
        {label.toUpperCase()}
      </text>
    </>
  )
}
