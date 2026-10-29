import { CONTACT_EMAIL, GITHUB_URL } from '../config'
import { LogoLockup } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-brass/40">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-10">
        <div className="flex items-center gap-4 text-cream">
          <LogoLockup height={36} />
          <span className="sr-only">urelimitless</span>
          <span className="plate plate-dark text-[0.62rem]">
            <span className="lamp is-lit" aria-hidden />
            Exchange open
          </span>
        </div>
        <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.95rem] text-cream-dim">
          <li>
            <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-cream">
              {CONTACT_EMAIL}
            </a>
          </li>
          <li>
            <a href={GITHUB_URL} target="_blank" rel="noreferrer" className="hover:text-cream">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://ringleader.urelimitless.com" target="_blank" rel="noreferrer" className="hover:text-cream">
              ringleader.urelimitless.com
            </a>
          </li>
        </ul>
        <p className="text-[0.85rem] text-cream-mute">© {new Date().getFullYear()} urelimitless</p>
      </div>
    </footer>
  )
}
