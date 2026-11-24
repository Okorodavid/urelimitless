// The U-bot "play" loop (glow version) for the site header.
// Ported from brand/logo/u-bot/motion/urelimitless-bot-play.html (?fx=glow): same timeline, same shapes.
// Differences: every pose is sampled once into a table so a frame costs lookups, not path measuring,
// and filter ids are prefixed so they can't clash with other SVGs on the page.

const NS = 'http://www.w3.org/2000/svg'
const U = 'M40,112 L76,76 L76,150 A52,52 0 0 0 180,150 L180,58 L216,22 L216,150 A88,88 0 0 1 40,150 Z'
const REST = { x: 52, y: 38 }
const PIPE = 'M106,60 L106,150 A22,22 0 0 0 150,150 L150,40'
const RIDE =
  'M186.8,8.8 L194.8,0.8 A30,30 0 0 1 246,22 L246,150 A118,118 0 0 1 10,150 L10,112 A30,30 0 0 1 18.8,90.8 L36.8,72.8'
const LOOP = 'M150,40 L150,-20 A34,34 0 1 1 218,-20 A34,34 0 1 1 150,-20 C150,-60 186.8,-60 186.8,8.8'
const TIP = { x: 186.8, y: 8.8 }
const TIP_CONTACT = { x: 208, y: 30 }
const HOME_FROM = { x: 36.8, y: 72.8 }
const CYCLE = 14
const LAUNCH = 6.2
const FLIGHT = 0.58
const FL = 1
const SHIFT = FL - FLIGHT
const IDLE_END = CYCLE - SHIFT
const HZ = 120

type Ease = (t: number) => number
type Key = [number, number, Ease?]
type Pose = {
  x: number
  y: number
  rot: number
  sx: number
  sy: number
  look: [number, number] | null
  local: [number, number]
  happy: boolean
  drag: number
  tb: number
  ex: number
  ey: number
  blink: number
  ant: number
}

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const sine: Ease = (t) => 0.5 - 0.5 * Math.cos(Math.PI * t)
const cosEase = (a: number, b: number): Ease => (t) => {
  const h = (x: number) => -Math.cos(Math.PI * x)
  return (h(lerp(a, b, t)) - h(a)) / (h(b) - h(a))
}
const bump = (v: number, a: number, b: number) => (v <= a || v >= b ? 0 : Math.sin((Math.PI * (v - a)) / (b - a)))
const within = (t: number, a: number, b: number) => t >= a && t < b
const hold: Ease = () => 0
const squish = (t: number, t0: number, amt: number) =>
  t < t0 ? 0 : amt * Math.exp(-(t - t0) * 9) * Math.cos((t - t0) * 22)
const wrap = (t: number) => ((t % CYCLE) + CYCLE) % CYCLE

export type LogoColors = { u: string; bot: string; bg: string }

/** Builds the animated symbol inside `root` (an SVG <g> in the logo's own coordinates) and returns a frame drawer. */
export function mountLogoMotion(root: SVGGElement, colors: LogoColors, idPrefix: string) {
  const el = <K extends keyof SVGElementTagNameMap>(tag: K, attrs: Record<string, string | number>, parent: Element) => {
    const n = document.createElementNS(NS, tag)
    for (const k in attrs) n.setAttribute(k, String(attrs[k]))
    parent.appendChild(n)
    return n
  }
  const set = (n: Element, attrs: Record<string, string | number>) => {
    for (const k in attrs) n.setAttribute(k, String(attrs[k]))
  }
  root.replaceChildren()

  const defs = el('defs', {}, root)
  const soft = el('filter', { id: `${idPrefix}-soft`, x: '-100%', y: '-100%', width: '300%', height: '300%' }, defs)
  el('feGaussianBlur', { stdDeviation: 9 }, soft)
  const glowF = el('filter', { id: `${idPrefix}-glow`, x: '-60%', y: '-60%', width: '220%', height: '220%' }, defs)
  el('feGaussianBlur', { in: 'SourceGraphic', stdDeviation: 3.5, result: 'b' }, glowF)
  const merge = el('feMerge', {}, glowF)
  el('feMergeNode', { in: 'b' }, merge)
  el('feMergeNode', { in: 'SourceGraphic' }, merge)

  const fx = el('g', { filter: `url(#${idPrefix}-glow)` }, root)
  el('path', { d: U, fill: colors.u }, root)
  const pipe = el('path', { d: PIPE, fill: 'none' }, root)
  const ride = el('path', { d: RIDE, fill: 'none' }, root)
  const loop = el('path', { d: LOOP, fill: 'none' }, root)
  const dust = [0, 1, 2, 3].map(() => el('circle', { fill: colors.u, r: 2.6, opacity: 0 }, root))
  const dotsG = el('g', {}, root)
  const halo = el('circle', { fill: colors.bot, r: 36, opacity: 0, filter: `url(#${idPrefix}-soft)` }, root)
  const bot = el('g', {}, root)
  const antenna = el('g', {}, bot)
  el('rect', { fill: colors.bot, x: -3, y: -44, width: 6, height: 17 }, antenna)
  el('circle', { fill: colors.bot, cy: -47, r: 6 }, antenna)
  el(
    'path',
    {
      fill: colors.bot,
      'fill-rule': 'evenodd',
      d: 'M30,0 A30,30 0 1 0 -30,0 A30,30 0 1 0 30,0 Z M-11,-9 H11 A10,10 0 0 1 11,11 H-11 A10,10 0 0 1 -11,-9 Z',
    },
    bot,
  )
  el('rect', { fill: colors.bg, x: -21, y: -9, width: 42, height: 20, rx: 10 }, bot)
  const eyes = el('g', {}, bot)
  el('circle', { fill: colors.bot, cx: -9, cy: 1, r: 5 }, eyes)
  el('circle', { fill: colors.bot, cx: 9, cy: 1, r: 5 }, eyes)
  const happy = el('g', { opacity: 0 }, bot)
  const smile = { fill: 'none', stroke: colors.bot, 'stroke-width': 3.4, 'stroke-linecap': 'round' }
  el('path', { ...smile, d: 'M-14,4 Q-9,-4 -4,4' }, happy)
  el('path', { ...smile, d: 'M4,4 Q9,-4 14,4' }, happy)

  const Lp = pipe.getTotalLength()
  const Lr = ride.getTotalLength()
  const Ll = loop.getTotalLength()

  function onPath(path: SVGPathElement, L: number, s: number, ref: number) {
    s = clamp(s, 0, L)
    const p = path.getPointAtLength(s)
    const a = path.getPointAtLength(clamp(s - 0.6, 0, L))
    const b = path.getPointAtLength(clamp(s + 0.6, 0, L))
    const rot = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI
    return { x: p.x, y: p.y, rot: rot + 360 * Math.round((ref - rot) / 360) }
  }
  function track(keys: Key[], t: number) {
    for (let i = 1; i < keys.length; i++) {
      const [t0, s0] = keys[i - 1]
      const [t1, s1, e] = keys[i]
      if (t <= t1) return lerp(s0, s1, e!(clamp((t - t0) / (t1 - t0))))
    }
    return keys[keys.length - 1][1]
  }
  const PIPE_KEYS: Key[] = [
    [2.5, 0],
    [3.2, 199, cosEase(0.3, 1)],
    [3.85, 35, sine],
    [4.5, 229, sine],
    [5.2, 10, sine],
    [5.5, 10, hold],
    [LAUNCH, Lp, cosEase(0, 0.5)],
  ]
  const RIDE_KEYS: Key[] = [
    [8.1, 0],
    [8.45, 11.3, sine],
    [8.9, 11.3, hold],
    [11.2, Lr, cosEase(0, 0.85)],
  ]
  const speed = (keys: Key[], t: number) => (track(keys, t + 0.005) - track(keys, t - 0.005)) / 0.01
  const KICKS = [
    [2.05, 28], [3.2, -12], [3.85, 12], [4.5, -14], [5.2, 14], [6.2, -22],
    [6.78, -30], [8.45, 14], [8.9, 10], [11.2, -18], [11.75, -26],
  ]
  const BLINKS = [0.6, 5.33, 7.42, 13.3]
  const baseTime = (t: number) => (t < LAUNCH ? t : t < LAUNCH + FL ? LAUNCH + ((t - LAUNCH) * FLIGHT) / FL : t - SHIFT)

  function computePose(t: number): Pose {
    const tb = baseTime(t)
    const p: Pose = {
      x: REST.x, y: REST.y, rot: 0, sx: 1, sy: 1, look: null, local: [0, 0],
      happy: false, drag: 0, tb, ex: 0, ey: 0, blink: 1, ant: 0,
    }
    if (tb < 1.8) {
      p.y -= 3 * Math.sin((2 * Math.PI * tb) / 1.8)
      if (within(tb, 0.8, 1.15)) {
        p.look = [-1, 0]
        p.rot = -6 * bump(tb, 0.8, 1.15)
      }
      if (tb >= 1.25) {
        const k = sine(clamp((tb - 1.25) / 0.25))
        p.look = [k, k * 0.8]
        p.rot = 8 * k
      }
    } else if (tb < 2.05) {
      const k = sine((tb - 1.8) / 0.25)
      p.rot = 8
      p.look = [1, 0.8]
      p.sy = 1 - 0.16 * k
      p.sx = 1 + 0.1 * k
    } else if (tb < 2.5) {
      const tau = tb - 2.05
      p.x = lerp(REST.x, 106, tau / 0.45)
      p.y = REST.y - 401 * tau + 1000 * tau * tau
      p.rot = lerp(8, 90, sine(tau / 0.45))
      p.look = [1, 0.6]
      const st = 0.14 * bump(tau, 0, 0.45)
      p.sy = 1 + st
      p.sx = 1 - st * 0.6
    } else if (tb < LAUNCH) {
      const s = track(PIPE_KEYS, tb)
      const v = speed(PIPE_KEYS, tb)
      Object.assign(p, onPath(pipe, Lp, s, lerp(90, -90, s / Lp)))
      const g = (v / 600) ** 2 * bump(s, 80, 169)
      p.sy = 1 - 0.12 * g
      p.sx = 1 + 0.08 * g
      p.local = [5 * clamp(v / 150, -1, 1), 0]
      p.drag = -clamp(v * 0.05, -22, 22)
      if (within(tb, 5.2, 5.5)) {
        p.local = [0, 0]
        p.look = [0, -0.4]
      }
    } else if (tb < LAUNCH + FLIGHT) {
      // loop-the-loop over the right arm
      const u = (t - LAUNCH) / FL
      const s = Ll * (0.85 * u + 0.15 * (1 - (1 - u) ** 2))
      Object.assign(p, onPath(loop, Ll, s, lerp(-90, 450, s / Ll)))
      if (u > 0.8) p.rot = lerp(p.rot, 315, sine((u - 0.8) / 0.2))
      p.sy = 1 + 0.08 * bump(u, 0, 1)
      p.sx = 1 - 0.05 * bump(u, 0, 1)
      p.local = [5, 0]
      p.happy = within(u, 0.35, 0.6)
    } else if (tb < 8.1) {
      p.x = TIP.x
      p.y = TIP.y
      p.rot = -45
      const k = squish(tb, 6.78, 0.24)
      p.sy = 1 - k
      p.sx = 1 + k * 0.8
      p.happy = within(tb, 6.86, 7.2)
      if (within(tb, 7.25, 7.65)) p.look = [-1, 0.2]
      if (tb >= 7.75) p.look = [0.8, 0.8]
    } else if (tb < 11.2) {
      const s = track(RIDE_KEYS, tb)
      const v = speed(RIDE_KEYS, tb)
      Object.assign(p, onPath(ride, Lr, s, lerp(-45, 315, s / Lr)))
      if (tb < 8.9) {
        p.look = [0.8, 0.8]
        p.rot += 9 * Math.sin(2 * Math.PI * 1.5 * clamp((tb - 8.45) / 0.45)) * (tb > 8.45 ? 1 : 0)
      } else {
        const g = (v / 420) ** 2 * bump(s, 199, 569)
        p.sy = 1 - 0.1 * g
        p.sx = 1 + 0.07 * g
        p.local = [5 * clamp(v / 120, 0, 1), 0]
        p.drag = -clamp(v * 0.05, -22, 22)
      }
    } else if (tb < 11.75) {
      const tau = tb - 11.2
      p.x = lerp(HOME_FROM.x, REST.x, sine(tau / 0.55))
      p.y = HOME_FROM.y - 393 * tau + 600 * tau * tau
      p.rot = lerp(315, 360, sine(tau / 0.55))
      p.look = [0, -0.3]
      const st = 0.1 * bump(tau, 0, 0.55)
      p.sy = 1 + st
      p.sx = 1 - st * 0.6
    } else {
      p.y += 12 * Math.exp(-(tb - 11.75) * 6) * Math.sin((tb - 11.75) * 12)
      const k = squish(tb, 11.75, 0.16)
      p.sy = 1 - k
      p.sx = 1 + k * 0.8
      if (tb >= 12.3) p.y -= 3 * Math.sin((2 * Math.PI * (tb - 12.3)) / (IDLE_END - 12.3))
      p.happy = within(tb, 11.85, 12.8)
    }
    ;[p.ex, p.ey] = p.local
    if (p.look) {
      const r = (p.rot * Math.PI) / 180
      const [wx, wy] = p.look
      p.ex = 5 * (wx * Math.cos(r) + wy * Math.sin(r))
      p.ey = 3 * (-wx * Math.sin(r) + wy * Math.cos(r))
    }
    p.blink = BLINKS.reduce((b, bt) => Math.min(b, 1 - 0.9 * bump(tb, bt, bt + 0.16)), 1)
    p.ant = p.drag
    for (const [kt, a] of KICKS) if (tb > kt) p.ant += a * Math.exp(-(tb - kt) * 4) * Math.sin((tb - kt) * 18)
    if (tb < 1.8) p.ant += 4 * Math.sin((2 * Math.PI * tb) / 1.8)
    if (tb >= 12.3) p.ant += 4 * Math.sin((2 * Math.PI * (tb - 12.3)) / (IDLE_END - 12.3))
    return p
  }

  // Sample the whole loop once.
  const N = CYCLE * HZ
  const table: Pose[] = Array.from({ length: N }, (_, i) => computePose(i / HZ))
  const pose = (t: number) => table[Math.round(wrap(t) * HZ) % N]
  const velocity = (t: number): [number, number] => {
    const a = pose(t - 1 / HZ)
    const b = pose(t + 1 / HZ)
    return [((b.x - a.x) * HZ) / 2, ((b.y - a.y) * HZ) / 2]
  }

  // Glow effects, drawn from the bot's own past positions.
  const TRAIL = 22
  const TRAIL_DT = 0.018
  const RING_EVERY = 0.09
  const RING_LIFE = 0.7
  const stroke = { stroke: colors.bot, 'stroke-linecap': 'round', fill: 'none' }
  const trail = Array.from({ length: TRAIL }, () => el('line', stroke, fx))
  const rings = Array.from({ length: Math.ceil(RING_LIFE / RING_EVERY) + 1 }, () =>
    el('circle', { fill: 'none', stroke: colors.bot, 'stroke-width': 1.6 }, fx),
  )
  const whoosh = [0, 1, 2].map(() => el('line', { stroke: colors.u, 'stroke-linecap': 'round', 'stroke-width': 2.2 }, fx))
  const STAR = 'M0,-1 Q0,0 1,0 Q0,0 0,1 Q0,0 -1,0 Q0,0 0,-1Z'
  const BURSTS = [2.05, 5.25, 6.78, 11.8]
  const LOOP_TOP = 0.42
  const burstEls = [...BURSTS, -1].map(() =>
    Array.from({ length: 6 }, (_, i) => el('path', { d: STAR, fill: i % 2 ? colors.u : colors.bot, opacity: 0 }, fx)),
  )
  const RAY_ANGLES = [-150, -125, -55, -30]
  const rays = RAY_ANGLES.map(() => el('line', { ...stroke, 'stroke-width': 3, opacity: 0 }, fx))
  const dots = Array.from({ length: Math.floor(Ll / 10) }, (_, i) => {
    const pt = loop.getPointAtLength(i * 10 + 5)
    return el('circle', { fill: colors.bot, r: 1.6, opacity: 0, cx: pt.x, cy: pt.y }, dotsG)
  })

  function drawGlow(t: number, p: Pose) {
    const [vx, vy] = velocity(t)
    const v = Math.hypot(vx, vy)
    const fast = clamp((v - 120) / 300)

    let prev = p
    trail.forEach((ln, k) => {
      const back = pose(t - (k + 1) * TRAIL_DT)
      const segV = Math.hypot(back.x - prev.x, back.y - prev.y) / TRAIL_DT
      const f = 1 - k / TRAIL
      set(ln, {
        x1: prev.x, y1: prev.y, x2: back.x, y2: back.y,
        'stroke-width': 18 * f ** 0.8,
        opacity: 0.5 * f * clamp((segV - 120) / 300),
      })
      prev = back
    })

    const newest = Math.floor(t / RING_EVERY) * RING_EVERY
    rings.forEach((c, j) => {
      const tj = newest - j * RING_EVERY
      const age = t - tj
      if (tj < 0 || age > RING_LIFE) return c.setAttribute('opacity', '0')
      const pj = pose(tj)
      const [ax, ay] = velocity(tj)
      const sj = clamp((Math.hypot(ax, ay) - 200) / 300)
      set(c, {
        cx: pj.x + 6 * Math.sin(j * 2.1),
        cy: pj.y + 6 * Math.cos(j * 1.7),
        r: 5 + (12 * age) / RING_LIFE,
        opacity: 0.7 * sj * (1 - age / RING_LIFE),
      })
    })

    const ux = v ? vx / v : 0
    const uy = v ? vy / v : 0
    const len = 44 * clamp((v - 380) / 300)
    whoosh.forEach((ln, i) => {
      const off = (i - 1) * 15
      const start = 40 + Math.abs(off) * 0.6
      const bx = p.x - ux * start - uy * off
      const by = p.y - uy * start + ux * off
      const l = len * (1 - 0.25 * Math.abs(i - 1))
      set(ln, { x1: bx, y1: by, x2: bx - ux * l, y2: by - uy * l, opacity: len > 1 ? 0.55 : 0 })
    })

    const loopT = LAUNCH + LOOP_TOP * FL
    burstEls.forEach((stars, b) => {
      const isLoop = b === BURSTS.length
      const bt = BURSTS[b]
      const age = isLoop ? t - loopT : p.tb - bt
      const where = isLoop ? pose(loopT) : pose(bt + (bt >= LAUNCH ? SHIFT : 0))
      stars.forEach((s, i) => {
        if (age < 0 || age > 0.75) return s.setAttribute('opacity', '0')
        const ang = ((i * 60 + b * 23) * Math.PI) / 180
        const d = 36 + 26 * (1 - (1 - age / 0.75) ** 2) + (i % 2) * 8
        const size = (i % 2 ? 4.5 : 7) * bump(age, 0, 0.75)
        set(s, {
          transform: `translate(${where.x + Math.cos(ang) * d},${where.y + Math.sin(ang) * d}) rotate(${age * 160}) scale(${size})`,
          opacity: 1,
        })
      })
    })

    const ra = p.tb - 11.8
    rays.forEach((ln, i) => {
      const ang = (RAY_ANGLES[i] * Math.PI) / 180
      const k = bump(ra, 0, 0.6)
      const r0 = 40 + 6 * k
      set(ln, {
        x1: p.x + Math.cos(ang) * r0, y1: p.y + Math.sin(ang) * r0,
        x2: p.x + Math.cos(ang) * (r0 + 11 * k), y2: p.y + Math.sin(ang) * (r0 + 11 * k),
        opacity: k > 0.02 ? 1 : 0,
      })
    })

    const u = (t - LAUNCH) / FL
    const done = Ll * (0.85 * clamp(u) + 0.15 * (1 - (1 - clamp(u)) ** 2))
    const fade = clamp(1 - (t - LAUNCH - FL - 0.6) / 0.8)
    dots.forEach((c, i) => {
      const s = i * 10 + 5
      c.setAttribute('opacity', String(u > 0 && s < done - 34 && s > 70 ? 0.75 * fade : 0))
    })

    set(halo, { cx: p.x, cy: p.y, opacity: 0.22 + 0.25 * fast + (p.happy ? 0.3 : 0) })
  }

  /** Draws the moment `t` seconds into the loop. */
  return function frame(time: number) {
    const t = wrap(time)
    const p = pose(t)
    bot.setAttribute(
      'transform',
      `translate(${p.x},${p.y}) rotate(${p.rot}) translate(0,30) scale(${p.sx},${p.sy}) translate(0,-30)`,
    )
    eyes.setAttribute('transform', `translate(${p.ex},${p.ey + 1}) scale(1,${p.blink}) translate(0,-1)`)
    eyes.setAttribute('opacity', p.happy ? '0' : '1')
    happy.setAttribute('opacity', p.happy ? '1' : '0')
    antenna.setAttribute('transform', `rotate(${p.ant} 0 -28)`)
    const d = p.tb - 6.78
    const DIRS = [[0.36, -1.06], [-1.06, 0.36], [0.7, -0.55], [-0.55, 0.7]]
    dust.forEach((c, i) => {
      if (d < 0 || d > 0.45) return c.setAttribute('opacity', '0')
      const k = 1 - Math.pow(1 - d / 0.45, 3)
      const dist = 4 + (i < 2 ? 18 : 11) * k
      set(c, {
        cx: TIP_CONTACT.x + DIRS[i][0] * dist,
        cy: TIP_CONTACT.y + DIRS[i][1] * dist,
        opacity: 0.85 * (1 - d / 0.45),
        r: 2.6 * (1 - (0.4 * d) / 0.45),
      })
    })
    drawGlow(t, p)
  }
}
