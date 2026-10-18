import { motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, Code2 } from 'lucide-react'
import { projects } from '../data/projects'

export function Calls() {
  const reduced = useReducedMotion()
  return (
    <section id="calls" className="mx-auto max-w-[1400px] px-4 py-20 sm:px-6 lg:px-10 lg:py-28">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <h2 className="display max-w-[14ch] text-[2.8rem] text-cream sm:text-[3.6rem] lg:text-[4.2rem]">
          Completed calls.
        </h2>
        <p className="max-w-[32rem] text-cream-dim md:text-right">
          Real products, built end to end by urelimitless. Each ticket shows what was asked for, what shipped, which
          tools were wired and who was on the line.
        </p>
      </div>

      <ol className="mt-12 border-t border-brass/40">
        {projects.map((p, i) => (
          <motion.li
            key={p.id}
            className="grid grid-cols-1 gap-6 border-b border-brass/30 py-10 md:grid-cols-12 md:gap-8 lg:py-12"
            initial={reduced ? false : { opacity: 0, x: -24 }}
            whileInView={reduced ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.05 + (i % 2) * 0.05, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="md:col-span-4">
              <h3 className="display text-[3rem] leading-[0.9] text-cream sm:text-[3.8rem] lg:text-[4.4rem]">
                {p.name}
              </h3>
              <p className="label mt-4 text-[0.7rem] text-brass-hi">{p.year}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-primary text-[0.8rem]">
                    Open live line
                    <ArrowUpRight size={16} strokeWidth={2.5} aria-hidden />
                  </a>
                )}
                {p.source && (
                  <a href={p.source} target="_blank" rel="noreferrer" className="btn btn-secondary text-[0.8rem]">
                    <Code2 size={16} strokeWidth={2.25} aria-hidden />
                    Source
                  </a>
                )}
              </div>
            </div>

            <div className="md:col-span-5">
              <p className="label text-[0.66rem] text-cream-mute">Requested</p>
              <p className="ticket mt-2 text-[1.05rem] leading-snug text-cream">{p.requested}</p>
              <p className="label mt-6 text-[0.66rem] text-cream-mute">Built</p>
              <p className="mt-2 max-w-[42rem] text-cream-dim">{p.built}</p>
            </div>

            <div className="md:col-span-3 md:border-l md:border-brass/30 md:pl-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="ticket text-[0.9rem] text-cream-mute">TICKET {p.orderNo}</span>
                <span className="plate text-[0.62rem]">
                  <span className="lamp is-lit" aria-hidden />
                  {p.status}
                </span>
              </div>
              <p className="label mt-6 text-[0.66rem] text-cream-mute">Tools wired</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {p.tools.map((t) => (
                  <li key={t} className="plate text-[0.62rem]">
                    {t}
                  </li>
                ))}
              </ul>
              <p className="label mt-6 text-[0.66rem] text-cream-mute">On the line</p>
              <p className="mt-2 text-cream-dim">{p.people}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}
