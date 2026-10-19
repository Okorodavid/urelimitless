import { m, useReducedMotion } from 'motion/react'
import { useState } from 'react'

const lines = [
  {
    no: 1,
    title: 'AI tool matching and integration',
    short: 'Which tools, wired in.',
    body: 'We sit with how your team actually works, pick the AI tools that fit (chat agents, automations, document pipelines) and wire them into what you already run: email, CRM, spreadsheets, Slack, your database.',
    example: 'Clinic intake forms summarised and missing records flagged before the doctor opens the file.',
  },
  {
    no: 2,
    title: 'Skilled talent on demand',
    short: 'The person who ships.',
    body: 'Vetted developers, designers, data and AI engineers placed on your project for as long as the job takes. You brief one operator; we staff the line and stay on it.',
    example: 'An agent engineer and a designer for a six-week build, then a part-time line to keep it running.',
  },
  {
    no: 3,
    title: 'Custom AI builds',
    short: 'Built to order.',
    body: 'Agents, bots and internal tools built by us end to end, with a human approval gate on anything risky. Every product in the completed calls below was built the same way.',
    example: 'A support agent that drafts replies in your tone and waits for a person before it issues a refund.',
  },
  {
    no: 4,
    title: 'Training and workshops',
    short: 'Your team on the board.',
    body: 'Hands-on sessions that take your team from curious to productive on the tools we install, run on your real work rather than slides.',
    example: 'A half-day where your ops team automates one process they hate, then keeps the automation.',
  },
]

export function Lines() {
  const reduced = useReducedMotion()
  return (
    <section id="lines" className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="display text-[2.8rem] text-cream sm:text-[3.6rem]">Four lines on the&nbsp;exchange.</h2>
          <p className="mt-5 max-w-[30rem] text-cream-dim">
            Most agencies sell one half: the tools, or the people. The board here carries both, so a request never
            has to pick a lane before it reaches us.
          </p>
        </div>

        <div className="panel lg:col-span-8">
          <span className="screw left-2 top-2" />
          <span className="screw right-2 top-2" style={{ '--slot': '-50deg' } as React.CSSProperties} />
          <span className="screw bottom-2 left-2" style={{ '--slot': '60deg' } as React.CSSProperties} />
          <span className="screw bottom-2 right-2" style={{ '--slot': '5deg' } as React.CSSProperties} />
          <ol className="divide-y divide-brass/30">
            {lines.map((line, i) => (
              <LineRow key={line.no} line={line} index={i} reduced={!!reduced} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function LineRow({ line, index, reduced }: { line: (typeof lines)[number]; index: number; reduced: boolean }) {
  const [on, setOn] = useState(reduced)
  return (
    <m.li
      className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 px-5 py-7 sm:px-8 sm:py-8 md:grid-cols-[auto_1fr_minmax(0,18rem)] md:gap-x-8"
      onViewportEnter={() => setOn(true)}
      viewport={{ once: true, amount: 0.3 }}
      initial={reduced ? false : { opacity: 0, x: -12 }}
      whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col items-center gap-3 pt-1">
        <span className={`toggle ${on ? 'is-on' : ''}`} aria-hidden>
          <span className="bat" />
        </span>
        <span className={`lamp ${on ? 'is-lit' : ''}`} aria-hidden />
        <span className="plate text-[0.6rem]">Line {line.no}</span>
        <span className="label text-[0.62rem] text-brass-hi">{on ? 'Open' : 'Closed'}</span>
      </div>
      <div className="min-w-0">
        <h3 className="display text-[1.9rem] text-cream sm:text-[2.3rem]">{line.title}</h3>
        <p className="mt-1 font-label text-[1.1rem] font-semibold uppercase tracking-[0.08em] text-brass-hi">{line.short}</p>
        <p className="mt-3 max-w-[40rem] text-cream-dim">{line.body}</p>
      </div>
      <div className="col-span-2 md:col-span-1 md:border-l md:border-brass/30 md:pl-6">
        <p className="label text-[0.66rem] text-cream-mute">A ticket might read</p>
        <p className="ticket mt-2 text-[0.95rem] leading-snug text-cream">{line.example}</p>
      </div>
    </m.li>
  )
}
