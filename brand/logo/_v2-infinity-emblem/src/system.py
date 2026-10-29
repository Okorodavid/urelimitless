"""Build the urelimitless logo system (emblem v2) into urelimitless/brand/logo.

Follows the logo-guide rules: simple, versatile (dark/light/mono/motion), memorable, scalable
(full emblem -> simplified icon -> favicon), and ships a test sheet with the blur, grayscale,
invert and small-size checks.
"""
import math
import shutil
import subprocess
from pathlib import Path

from emblem import FONTS, build, centreline, viewbox
from wordmark import outline

OUT = Path(r"C:\Users\Uche\Desktop\urelimitless\brand\logo")
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
BS700 = FONTS / "big-shoulders-display" / "files" / "big-shoulders-display-latin-700-normal.woff2"
BC600 = FONTS / "barlow-condensed" / "files" / "barlow-condensed-latin-600-normal.woff2"

BAKE, DEEP, CREAM, INK = "#1d1b19", "#141210", "#efe6d6", "#16130f"
AMBER, RED, WHITE, BLACK = "#e8b52f", "#d9452f", "#ffffff", "#000000"
# name -> (ribbon/text colour, accent) ; accent marks the tallest growth bar and the icon's arrowhead
PALETTES = {"dark": (CREAM, AMBER), "light": (INK, RED), "red": (RED, RED), "black": (BLACK, BLACK), "white": (WHITE, WHITE)}
TAGLINE = "GROW BEYOND LIMITS"


def emblem(colour, accent, variant="full"):
    body = build(colour, None, accent, variant)
    if variant != "full":                       # the icon keeps the brand accent on the arrowhead
        parts = body.rsplit(f'fill="{colour}"', 1)
        body = f'fill="{accent}"'.join(parts)
    return body


def svg(view, body, title="urelimitless"):
    x, y, w, h = view
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x:.1f} {y:.1f} {w:.1f} {h:.1f}" role="img" '
            f'aria-label="{title}"><title>{title}</title>{body}</svg>\n')


def words(width_target):
    """Outlined wordmark + tagline, both centred on x=0, wordmark cap-top at y=0. Returns (svg, height)."""
    d, tw, cap, _ = outline("urelimitless", 100, BS700)
    s = width_target / tw
    wsize = 100 * s
    d, tw, cap, _ = outline("urelimitless", wsize, BS700)
    td, ttw, tcap, _ = outline(TAGLINE, 100, BC600, tracking=0.42)
    ts = (tw * 0.78) / ttw * 100
    td, ttw, tcap, _ = outline(TAGLINE, ts, BC600, tracking=0.42)
    gap = cap * 0.42
    text = (f'<path d="{d}" transform="translate({-tw / 2:.2f} {cap:.2f})"/>'
            f'<path d="{td}" opacity=".82" transform="translate({-ttw / 2:.2f} {cap + gap + tcap:.2f})"/>')
    return text, cap + gap + tcap, tw


def stacked(palette):
    colour, accent = PALETTES[palette]
    ex, ey, ew, eh = viewbox()
    text, th, tw = words(ew * 0.82)
    cx = ex + ew / 2
    top = ey + eh + eh * 0.10
    body = emblem(colour, accent) + f'<g fill="{colour}" transform="translate({cx:.2f} {top:.2f})">{text}</g>'
    pad = ew * 0.04
    return svg((ex - pad, ey - pad, ew + 2 * pad, eh + eh * 0.10 + th + 2 * pad), body)


def horizontal(palette):
    colour, accent = PALETTES[palette]
    ex, ey, ew, eh = viewbox()
    d, tw, cap, _ = outline("urelimitless", 100, BS700)
    size = eh * 0.36 / cap * 100
    d, tw, cap, _ = outline("urelimitless", size, BS700)
    td, ttw, tcap, _ = outline(TAGLINE, 100, BC600, tracking=0.42)
    ts = (tw * 0.78) / ttw * 100
    td, ttw, tcap, _ = outline(TAGLINE, ts, BC600, tracking=0.42)
    gap = cap * 0.42
    block = cap + gap + tcap
    tx = ex + ew + ew * 0.06
    ty = ey + (eh - block) / 2
    body = (emblem(colour, accent) +
            f'<g fill="{colour}" transform="translate({tx:.2f} {ty:.2f})">'
            f'<path d="{d}" transform="translate(0 {cap:.2f})"/>'
            f'<path d="{td}" opacity=".82" transform="translate(0 {cap + gap + tcap:.2f})"/></g>')
    pad = eh * 0.08
    return svg((ex - pad, ey - pad, tx + tw - ex + 2 * pad, eh + 2 * pad), body)


def mark(palette, variant="full"):
    colour, accent = PALETTES[palette]
    return svg(viewbox(), emblem(colour, accent, variant))


def tile(variant, size, title="urelimitless"):
    """Bakelite rounded-square app icon / favicon holding the given emblem variant."""
    ex, ey, ew, eh = viewbox()
    s = size * (0.80 if variant == "tiny" else 0.74) / ew
    cx = size / 2 - (ex + ew / 2) * s
    cy = size / 2 - (ey + eh / 2) * s
    ring = "" if size < 100 else (f'<rect x="{size * .012:.1f}" y="{size * .012:.1f}" width="{size * .976:.1f}" '
                                  f'height="{size * .976:.1f}" rx="{size * .21:.1f}" fill="none" stroke="#b08d3f" '
                                  f'stroke-opacity=".45" stroke-width="{size * .008:.1f}"/>')
    body = (f'<rect width="{size}" height="{size}" rx="{size * 0.22:.1f}" fill="{BAKE}"/>{ring}'
            f'<g transform="translate({cx:.2f} {cy:.2f}) scale({s:.4f})">{emblem(CREAM, AMBER, variant)}</g>')
    return svg((0, 0, size, size), body, title)


def animated(with_name=True):
    """The logo draws itself the way the shape already moves: from the hairline start, through
    both loops, out to the arrow tip. The circuit lights, the bars grow, then the name settles in
    underneath. Calm and confident (no bounce or spin). Reduced motion shows the finished logo."""
    pts = centreline()
    length = sum(math.dist(pts[i], pts[i + 1]) for i in range(len(pts) - 1))
    line = " ".join(f"{x:.1f},{y:.1f}" for x, y in pts)
    style = f"""<style>
.draw{{stroke-dasharray:{length:.0f};stroke-dashoffset:{length:.0f};animation:draw 1.7s cubic-bezier(.65,0,.35,1) .2s forwards}}
.ai{{opacity:0;animation:fade .5s ease-out 1.15s forwards}}
.bar{{transform-box:fill-box;transform-origin:50% 100%;transform:scaleY(0);animation:grow .5s cubic-bezier(.2,.8,.2,1) forwards}}
.bar0{{animation-delay:1.3s}}.bar1{{animation-delay:1.42s}}.bar2{{animation-delay:1.54s}}
.name{{opacity:0;transform:translateY(14px);animation:rise .7s cubic-bezier(.2,.8,.2,1) 1.95s forwards}}
@keyframes draw{{to{{stroke-dashoffset:0}}}}@keyframes fade{{to{{opacity:1}}}}@keyframes grow{{to{{transform:scaleY(1)}}}}
@keyframes rise{{to{{opacity:1;transform:none}}}}
@media (prefers-reduced-motion:reduce){{.draw{{animation:none;stroke-dashoffset:0}}.ai,.name{{animation:none;opacity:1;transform:none}}.bar{{animation:none;transform:none}}}}
</style>"""
    body = emblem(CREAM, AMBER)
    ribbon, rest = body.split('<g class="ai">', 1)
    x, y, w, h = viewbox()
    mask = (f'<mask id="reveal" maskUnits="userSpaceOnUse" x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}">'
            f'<polyline class="draw" points="{line}" fill="none" stroke="#fff" stroke-width="64" '
            f'stroke-linecap="round" stroke-linejoin="round"/></mask>')
    art = f'{style}<defs>{mask}</defs><g mask="url(#reveal)">{ribbon}</g><g class="ai">{rest}'
    if not with_name:
        return svg((x, y, w, h), art)
    text, th, _ = words(w * 0.82)
    top = y + h + h * 0.10
    art += f'<g class="name" fill="{CREAM}"><g transform="translate({x + w / 2:.2f} {top:.2f})">{text}</g></g>'
    pad = w * 0.04
    return svg((x - pad, y - pad, w + 2 * pad, h + h * 0.10 + th + 2 * pad), art)


def shoot(html, name, w, h, transparent=False):
    page = OUT / "_render.html"
    page.write_text(html, encoding="utf-8")
    args = [EDGE, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
            f"--window-size={w},{h}", f"--screenshot={OUT / name}", page.as_uri()]
    if transparent:
        args.insert(2, "--default-background-color=00000000")
    subprocess.run(args, check=True, capture_output=True, timeout=90)
    page.unlink()


def export_png(svg_name, png_name, width, bg=None, pad=0.06):
    text = (OUT / svg_name).read_text(encoding="utf-8")
    vb = [float(v) for v in text.split('viewBox="')[1].split('"')[0].split()]
    p = round(width * pad)
    iw = width - 2 * p
    ih = round(iw * vb[3] / vb[2])
    page = (f'<body style="margin:0;background:{bg or "transparent"}"><img src="{(OUT / svg_name).as_uri()}" '
            f'style="display:block;width:{iw}px;height:{ih}px;margin:{p}px"></body>')
    shoot(page, png_name, width, ih + 2 * p, transparent=bg is None)


def test_sheet():
    u = lambda name: (OUT / name).as_uri()
    def img(name, w, extra=""):
        return f'<img src="{u(name)}" style="width:{w}px;{extra}">'
    def cell(title, verdict, inner, bg=BAKE):
        return (f'<div class="c" style="background:{bg}"><div class="in">{inner}</div>'
                f'<div class="t"><b>{title}</b><span>{verdict}</span></div></div>')
    sizes = (f'<div class="row">{img("urelimitless-emblem-dark.svg", 128)}{img("urelimitless-emblem-dark.svg", 64)}'
             f'<i>full</i>{img("urelimitless-icon-dark.svg", 48)}{img("urelimitless-icon-dark.svg", 32)}{img("urelimitless-icon-dark.svg", 24)}'
             f'<i>icon</i>{img("favicon.svg", 32)}{img("favicon.svg", 16)}<i>favicon</i></div>')
    cells = [
        cell("Scale: 128px to 16px", "Pass, with three versions: full emblem down to 64px, icon to 24px, favicon to 16px", sizes),
        cell("Blur test", "Pass: the infinity and the arrow still read", img("urelimitless-lockup-stacked-dark.svg", 300, "filter:blur(5px)")),
        cell("Without the name", "Pass: the symbol stands alone", img("urelimitless-emblem-dark.svg", 300)),
        cell("Grayscale", "Pass: it does not rely on colour", img("urelimitless-lockup-stacked-dark.svg", 300, "filter:grayscale(1)")),
        cell("Inverted", "Pass", img("urelimitless-lockup-stacked-light.svg", 300, "filter:invert(1)"), BLACK),
        cell("One colour", "Pass: print, stamps, embroidery",
             f'<div class="row" style="gap:28px">{img("urelimitless-emblem-black.svg", 200)}</div>', WHITE),
        cell("Light mode", "Pass", img("urelimitless-lockup-stacked-light.svg", 300), CREAM),
        cell("Red, like the reference", "Optional colourway", img("urelimitless-lockup-stacked-red.svg", 300), "#fbf8f2"),
        cell("Horizontal", "For headers and email signatures", img("urelimitless-lockup-horizontal-dark.svg", 420)),
    ]
    css = (f"*{{margin:0;box-sizing:border-box}}body{{background:#0b0a09;width:1500px;padding:30px;font-family:sans-serif}}"
           f".g{{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}}"
           f".c{{position:relative;height:380px;border-radius:12px;overflow:hidden;display:flex;flex-direction:column}}"
           f".in{{flex:1;display:flex;align-items:center;justify-content:center}}"
           f".row{{display:flex;align-items:center;gap:16px;flex-wrap:wrap;justify-content:center;padding:0 16px}}"
           f".row i{{font:11px sans-serif;color:#a89c86;margin-right:10px}}"
           f".t{{display:flex;flex-direction:column;gap:3px;padding:12px 16px;background:rgba(0,0,0,.55)}}"
           f".t b{{font:700 15px sans-serif;color:#efe6d6}}.t span{{font:13px sans-serif;color:#cfc3ad}}")
    shoot(f'<html><head><style>{css}</style></head><body><div class="g">{"".join(cells)}</div></body></html>',
          "urelimitless-logo-tests.png", 1500, 1260)


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    old = OUT / "_v1-infinity-rejected"
    if not old.exists():                         # first run only: keep the rejected v1 files aside
        old.mkdir()
        for f in list(OUT.iterdir()):
            if f.is_file():
                shutil.move(str(f), old / f.name)
    files = {}
    for p in PALETTES:
        files[f"urelimitless-emblem-{p}.svg"] = mark(p)
        files[f"urelimitless-icon-{p}.svg"] = mark(p, "icon")
    for p in ("dark", "light", "red", "black", "white"):
        files[f"urelimitless-lockup-stacked-{p}.svg"] = stacked(p)
    for p in ("dark", "light"):
        files[f"urelimitless-lockup-horizontal-{p}.svg"] = horizontal(p)
    files["urelimitless-app-icon.svg"] = tile("icon", 512)
    files["favicon.svg"] = tile("tiny", 64)
    files["urelimitless-emblem-animated.svg"] = animated(with_name=False)
    files["urelimitless-lockup-animated.svg"] = animated()
    for name, text in files.items():
        (OUT / name).write_text(text, encoding="utf-8")
    export_png("urelimitless-lockup-stacked-dark.svg", "urelimitless-lockup-stacked-dark.png", 1600, BAKE, .1)
    export_png("urelimitless-lockup-stacked-light.svg", "urelimitless-lockup-stacked-light.png", 1600, CREAM, .1)
    export_png("urelimitless-lockup-stacked-red.svg", "urelimitless-lockup-stacked-red.png", 1600, WHITE, .1)
    export_png("urelimitless-lockup-horizontal-dark.svg", "urelimitless-lockup-horizontal-dark.png", 2000, BAKE, .05)
    export_png("urelimitless-emblem-dark.svg", "urelimitless-emblem-transparent.png", 1200)
    export_png("urelimitless-app-icon.svg", "urelimitless-app-icon-512.png", 512, None, 0)
    export_png("favicon.svg", "favicon-32.png", 32, None, 0)
    test_sheet()
    print("\n".join(sorted(p.name for p in OUT.iterdir())))
