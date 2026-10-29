"""Motion deliverables for the U-bot logo.

1. motion/urelimitless-intro.svg: the U rises in, the bot lifts off the 45° slope to its hover spot,
   bobs twice and settles, then the name fades in. Pure CSS inside the SVG; reduced motion = finished logo.
2. motion/urelimitless-mascot-loop.html: the playful loop from the design session (bot rides round the U,
   settles on the right peak, hops back with a flip and hovers), in the final colours, with reduced motion.
"""
from kit import INK, SPARK, WHITE, U, K_DIR, WORDMARK_D, WM_BOX, bot_full

STYLE = """<style>
.u{opacity:0;transform:translateY(18px);animation:rise .6s cubic-bezier(.2,.8,.2,1) .1s forwards}
.lift{opacity:0;transform:translate(26px,26px) scale(.55);transform-box:fill-box;transform-origin:50% 100%;
  animation:lift .75s cubic-bezier(.3,1.35,.5,1) .55s forwards}
.bob{animation:bob 1.1s ease-in-out 1.35s 2}
.wm{opacity:0;transform:translateX(-12px);animation:rise .7s cubic-bezier(.2,.8,.2,1) 1.2s forwards}
@keyframes rise{to{opacity:1;transform:none}}
@keyframes lift{60%{opacity:1}to{opacity:1;transform:none}}
@keyframes bob{50%{transform:translateY(-5px)}}
@media (prefers-reduced-motion:reduce){.u,.lift,.wm{animation:none;opacity:1;transform:none}.bob{animation:none}}
</style>"""


def intro(u=WHITE, bot=SPARK, word=WHITE, bg=INK):
    s = 0.62
    x1 = 296 + WM_BOX[2] * s
    body = (f'<rect width="100%" height="100%" fill="{bg}"/>' if bg else "") + (
        f'<g transform="translate(18.5,23.5) scale(0.92)">'
        f'<g class="u"><path fill="{u}" d="{U}"/></g>'
        f'<g class="bob"><g class="lift">{bot_full(52, 38).replace("class=\"bot\"", f"fill=\"{bot}\"")}</g></g></g>'
        f'<g class="wm"><g transform="translate(296,50.5) scale({s})"><path fill="{word}" fill-rule="evenodd" d="{WORDMARK_D}"/></g></g>')
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -20 {x1 + 20:.0f} 290" role="img" aria-label="urelimitless logo">'
            f'<title>urelimitless logo</title>{STYLE}{body}</svg>\n')


LOOP = """<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>urelimitless mascot loop</title>
<style>
  :root { --bg: #0E1116; --u: #FFFFFF; --bot: #8EA2FF; }
  @media (prefers-color-scheme: light) { :root { --bg: #F6F5F1; --u: #0E1116; --bot: #2D4BFF; } }
  html, body { margin: 0; height: 100%; background: var(--bg); }
  main { min-height: 100vh; display: grid; place-items: center; padding: 16px; box-sizing: border-box; }
  svg { width: min(80vw, 420px); height: auto; overflow: visible; cursor: pointer; }
  .u { fill: var(--u); } .bot * { fill: var(--bot); } .bot .visor { fill: var(--bg); }
</style></head>
<body><main><svg id="logo" viewBox="-20 -100 296 390" role="img" aria-label="urelimitless logo"></svg></main>
<script>
// Click to replay. ?t=<seconds> freezes a frame. Reduced motion shows the bot resting in its hover spot.
const NS = 'http://www.w3.org/2000/svg';
const U = '__U__';
const REST = { x: 52, y: 38 };
const ROUTE = 'M52,38 C8,40 6,100 6,150 A122,122 0 0 0 250,150 L250,40 C250,10 215,-10 183.4,9.4';
const TOP = { x: 183.4, y: 9.4 }, TOP_ANGLE = -45;
const T = { wind: .3, travel: 2.1, settle: .45, crouch: .2, jump: .85, land: .3, rest: 1.6 };
const ENDS = []; let CYCLE = 0; for (const k in T) { CYCLE += T[k]; ENDS.push([k, CYCLE]); }
const ease = t => t < .5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2, lerp = (a, b, t) => a + (b - a) * t;
const el = (tag, attrs, parent) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); parent.appendChild(n); return n; };
const svg = document.getElementById('logo');
el('path', { d: U, class: 'u' }, svg);
const route = el('path', { d: ROUTE, style: 'fill:none;stroke:none' }, svg);
const bot = el('g', { class: 'bot' }, svg);
el('circle', { r: 30 }, bot); el('rect', { class: 'visor', x: -21, y: -9, width: 42, height: 20, rx: 10 }, bot);
el('circle', { cx: -9, cy: 1, r: 5 }, bot); el('circle', { cx: 9, cy: 1, r: 5 }, bot);
el('rect', { x: -3, y: -44, width: 6, height: 16 }, bot); el('circle', { cy: -47, r: 6 }, bot);
const L = route.getTotalLength(); let prev = 0;
const unwrap = a => { while (a - prev > 180) a -= 360; while (a - prev < -180) a += 360; return prev = a; };
const angleAt = len => { const a = route.getPointAtLength(Math.max(0, len - .5)), b = route.getPointAtLength(Math.min(L, len + .5));
  return Math.atan2(-(b.y - a.y), -(b.x - a.x)) * 180 / Math.PI; };
const pose = (x, y, rot = 0, sx = 1, sy = 1) => bot.setAttribute('transform', `translate(${x},${y}) rotate(${rot}) translate(0,30) scale(${sx},${sy}) translate(0,-30)`);
function frame(t) {
  t %= CYCLE; let phase, start = 0;
  for (const [k, e] of ENDS) { if (t < e) { phase = k; break; } start = e; }
  const p = (t - start) / T[phase], s = Math.sin(p * Math.PI);
  switch (phase) {
    case 'wind': prev = 0; pose(REST.x, REST.y, 0, 1 + .08*s, 1 - .1*s); break;
    case 'travel': { const len = ease(p) * L, pt = route.getPointAtLength(len); let a = unwrap(angleAt(Math.max(len, .6)));
      if (p < .08) a = lerp(0, a, p / .08); if (p > .9) a = lerp(a, TOP_ANGLE, (p - .9) / .1); pose(pt.x, pt.y, a); break; }
    case 'settle': pose(TOP.x, TOP.y, lerp(TOP_ANGLE, 0, ease(Math.min(p * 1.6, 1))), 1, 1 + .06*s); break;
    case 'crouch': pose(TOP.x, TOP.y, 0, 1 + .1*p, 1 - .16*p); break;
    case 'jump': { const st = 1 + .12 * s; pose(lerp(TOP.x, REST.x, p), lerp(TOP.y, REST.y, p) - 150 * 4 * p * (1 - p), -360 * ease(p), 2 - st, st); break; }
    case 'land': pose(REST.x, REST.y, 0, 1 + .14*s, 1 - .18*s); break;
    default: pose(REST.x, REST.y - 3 * Math.sin(p * Math.PI * 2));
  }
}
const q = new URLSearchParams(location.search);
if (q.has('t')) frame(parseFloat(q.get('t')));
else if (matchMedia('(prefers-reduced-motion: reduce)').matches) pose(REST.x, REST.y);
else { let t0 = performance.now(); const tick = now => { frame((now - t0) / 1000); requestAnimationFrame(tick); };
  requestAnimationFrame(tick); svg.addEventListener('click', () => { t0 = performance.now(); }); }
</script></body></html>
"""

if __name__ == "__main__":
    (K_DIR / "motion" / "urelimitless-intro-dark.svg").write_text(intro(), encoding="utf-8")
    (K_DIR / "motion" / "urelimitless-intro-light.svg").write_text(intro(INK, "#2D4BFF", INK, "#F6F5F1"), encoding="utf-8")
    (K_DIR / "motion" / "urelimitless-mascot-loop.html").write_text(LOOP.replace("__U__", U), encoding="utf-8")
    print("motion written")
