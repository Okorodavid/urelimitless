import { toolStrip } from '../data/board'

export function ToolStrip() {
  const items = [...toolStrip, ...toolStrip]
  return (
    <section aria-label="Tools on the board" className="border-y border-brass/40 bg-bakelite-deep/70 py-4">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 overflow-hidden px-4 sm:px-6 lg:px-10">
        <span className="plate plate-dark shrink-0 text-[0.68rem]">On the board</span>
        <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
          <ul className="marquee" aria-hidden>
            {items.map((t, i) => (
              <li key={`${t}-${i}`} className="plate text-[0.72rem] whitespace-nowrap">
                {t}
              </li>
            ))}
          </ul>
          <ul className="sr-only">
            {toolStrip.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
