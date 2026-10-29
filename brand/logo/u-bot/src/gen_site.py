"""Generate src/components/Logo.tsx for the site from the logo kit, and the 1200x630 link-preview image."""
import subprocess
from pathlib import Path

from kit import U, WORDMARK_D, WM_BOX, K_DIR

SITE = Path(r"C:\Users\Uche\Desktop\urelimitless")
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
LOCK_W = round(296 + WM_BOX[2] * 0.62 + 20)

tsx = f"""// The urelimitless logo (U-bot). Generated from brand/logo/u-bot/src (gen_site.py): edit the kit, not this file.
// The U and the name take currentColor; the bot takes `bot`.

const U = '{U}'

const WORDMARK =
  '{WORDMARK_D}'

function Bot({{ fill }}: {{ fill: string }}) {{
  return (
    <g fill={{fill}}>
      <path
        fillRule="evenodd"
        d="M22,38 A30,30 0 1 0 82,38 A30,30 0 1 0 22,38 Z M41,29 H63 A10,10 0 0 1 63,49 H41 A10,10 0 0 1 41,29 Z"
      />
      <circle cx="43" cy="39" r="5" />
      <circle cx="61" cy="39" r="5" />
      <rect x="49" y="-6" width="6" height="16" />
      <circle cx="52" cy="-9" r="6" />
    </g>
  )
}}

function Symbol({{ bot }}: {{ bot: string }}) {{
  return (
    <g transform="translate(18.5,23.5) scale(0.92)">
      <path d={{U}} fill="currentColor" />
      <Bot fill={{bot}} />
    </g>
  )
}}

/** Symbol alone. Use from 64px up; the brand kit has small cuts for smaller sizes. */
export function LogoSymbol({{ size = 64, bot = '#E8B52F' }}: {{ size?: number; bot?: string }}) {{
  return (
    <svg width={{size}} height={{size}} viewBox="0 0 256 256" aria-hidden className="shrink-0">
      <Symbol bot={{bot}} />
    </svg>
  )
}}

/** Horizontal logo: symbol and name. Keep it at least 140px wide (height 36px or more). */
export function LogoLockup({{ height = 40, bot = '#E8B52F', className = '' }}: {{ height?: number; bot?: string; className?: string }}) {{
  return (
    <svg
      height={{height}}
      width={{(height * {LOCK_W}) / 256}}
      viewBox="0 0 {LOCK_W} 256"
      aria-hidden
      className={{`shrink-0 ${{className}}`}}
    >
      <Symbol bot={{bot}} />
      <path transform="translate(296,50.5) scale(0.62)" fill="currentColor" fillRule="evenodd" d={{WORDMARK}} />
    </svg>
  )
}}
"""
(SITE / "src" / "components" / "Logo.tsx").write_text(tsx, encoding="utf-8")

# Link preview: the dark horizontal logo centred on the site's bakelite ground, 1200x630.
lock = (K_DIR / "lockup" / "urelimitless-horizontal-switchboard.svg").as_uri()
page = Path(__file__).parent / "og.html"
page.write_text('<body style="margin:0;width:1200px;height:630px;background:#1D1B19;display:flex;align-items:center;'
                f'justify-content:center"><img src="{lock}" style="width:820px"></body>', encoding="utf-8")
subprocess.run([EDGE, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
                "--window-size=1200,630", f"--screenshot={SITE / 'public' / 'og-image.png'}", page.as_uri()],
               check=True, capture_output=True, timeout=60)
print("Logo.tsx + og-image.png written; lockup width", LOCK_W)
