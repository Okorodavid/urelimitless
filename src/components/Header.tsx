import { useState } from 'react'

const links = [
  { href: '#lines', label: 'Lines' },
  { href: '#how', label: 'How a call goes' },
  { href: '#calls', label: 'Completed calls' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b border-brass/40 bg-bakelite/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-10">
        <a href="#top" className="flex items-center gap-3" aria-label="urelimitless, home">
          <JackMark />
          <span className="display text-[1.6rem] normal-case tracking-normal text-cream sm:text-[1.9rem]">
            urelimitless
          </span>
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-2 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="group plate text-[0.72rem] no-underline hover:text-ink">
              <span className="lamp" aria-hidden />
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#ring" className="btn btn-primary whitespace-nowrap text-[0.85rem] sm:text-[0.95rem]">
            <span className="lamp is-lit" aria-hidden />
            <span className="sm:hidden">Patch in</span>
            <span className="hidden sm:inline">Patch us in</span>
          </a>
          <button
            type="button"
            className="btn btn-secondary px-3 text-[0.8rem] md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? 'Close' : 'Board'}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Primary, mobile" className="border-t border-brass/30 px-4 py-3 md:hidden">
          <ul className="flex flex-col gap-2">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)} className="plate w-full text-[0.8rem] no-underline">
                  <span className="lamp" aria-hidden />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

export function JackMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden className="shrink-0">
      <defs>
        <radialGradient id="markBrass" cx="35%" cy="30%" r="75%">
          <stop offset="0" stopColor="#e2c26f" />
          <stop offset="0.45" stopColor="#b08d3f" />
          <stop offset="1" stopColor="#6d5424" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="34" r="21" fill="url(#markBrass)" />
      <circle cx="32" cy="34" r="14" fill="#2a2522" />
      <circle cx="32" cy="34" r="6" fill="#0d0c0b" />
      <circle cx="50" cy="12" r="6" fill="#e8b52f" />
    </svg>
  )
}
