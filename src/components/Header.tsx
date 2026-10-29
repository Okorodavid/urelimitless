import { useState } from 'react'
import { LogoLockup } from './Logo'

const links = [
  { href: '#lines', label: 'Lines' },
  { href: '#how', label: 'How a call goes' },
  { href: '#calls', label: 'Completed calls' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-40 border-b border-brass/40 bg-bakelite/85 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-3 py-3 sm:gap-4 sm:px-6 lg:px-10">
        <a href="#top" className="flex items-center text-cream" aria-label="urelimitless, home">
          <LogoLockup height={36} className="sm:hidden" />
          <LogoLockup height={44} className="hidden sm:block" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-2 md:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="group plate text-[0.72rem] no-underline hover:text-ink">
              <span className="lamp" aria-hidden />
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <a href="#ring" className="btn btn-primary whitespace-nowrap px-3 text-[0.75rem] sm:px-[1.5em] sm:text-[0.95rem]">
            <span className="lamp is-lit" aria-hidden />
            <span className="sm:hidden">Patch in</span>
            <span className="hidden sm:inline">Patch us in</span>
          </a>
          <button
            type="button"
            className="btn btn-secondary px-2.5 text-[0.75rem] sm:px-3 sm:text-[0.8rem] md:hidden"
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
