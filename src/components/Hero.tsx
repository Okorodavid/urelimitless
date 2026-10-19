import { m, useReducedMotion } from 'motion/react'
import { PatchBay } from './PatchBay'

export function Hero() {
  const reduced = useReducedMotion()
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  return (
    <section id="top" className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-10 px-4 pb-16 pt-10 sm:px-6 lg:grid-cols-12 lg:gap-8 xl:gap-10 lg:px-10 lg:pb-24 lg:pt-14 xl:pt-10">
      <div className="lg:col-span-5">
        <m.h1
          {...rise(0.05)}
          className="display text-[3.4rem] text-cream sm:text-[4.6rem] lg:text-[3.8rem] xl:text-[5rem] 2xl:text-[6rem]"
        >
          Your company, patched through to the right tools and&nbsp;people.
        </m.h1>
        <m.p {...rise(0.2)} className="mt-6 max-w-[34rem] text-[1.1rem] leading-relaxed text-cream-dim sm:text-[1.2rem]">
          urelimitless is the operator. We pick the AI tools that fit the way your team already works, wire them in,
          and send the engineers, designers and analysts who deliver the job. One call, both halves.
        </m.p>
        <m.div {...rise(0.32)} className="mt-8 flex flex-wrap items-center gap-3">
          <a href="#ring" className="btn btn-primary">
            <span className="lamp is-lit" aria-hidden />
            Patch us in
          </a>
          <a href="#calls" className="btn btn-secondary">
            See completed calls
          </a>
        </m.div>
        <m.dl {...rise(0.42)} className="mt-10 hidden max-w-[34rem] grid-cols-2 sm:grid gap-x-6 gap-y-4 border-t border-brass/40 pt-6 text-[0.95rem] sm:grid-cols-3">
          <div>
            <dt className="label text-[0.68rem] text-brass-hi">Left of the board</dt>
            <dd className="mt-1.5 text-cream-dim">Companies with a job to do</dd>
          </div>
          <div>
            <dt className="label text-[0.68rem] text-brass-hi">Right of the board</dt>
            <dd className="mt-1.5 text-cream-dim">AI tools and the people who ship with them</dd>
          </div>
          <div>
            <dt className="label text-[0.68rem] text-brass-hi">The operator</dt>
            <dd className="mt-1.5 text-cream-dim">Us, patching the cord through</dd>
          </div>
        </m.dl>
      </div>

      <m.div
        {...(reduced
          ? {}
          : {
              initial: { opacity: 0, scale: 0.985 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 1, delay: 0.15, ease: [0.16, 1, 0.3, 1] as const },
            })}
        className="lg:col-span-7"
      >
        <PatchBay />
        <p className="mt-3 text-center text-[0.85rem] text-cream-mute">
          <span className="sm:hidden">Tap a company jack to patch it through by hand.</span>
          <span className="hidden sm:inline">Hover or tab to a company jack to patch it through by hand.</span>
        </p>
      </m.div>
    </section>
  )
}
