"""urelimitless emblem: an infinity ribbon (limitless) that opens into an arrow (beyond),
with AI circuitry in one loop and a business growing in the other.

Everything is generated from one centreline so it stays consistent at every size.
"""
import math
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).parent
EDGE = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"
FONTS = Path(r"C:\Users\Uche\Desktop\urelimitless\node_modules\@fontsource")

A = 120.0          # half-width of the right lobe
LEFT = 0.78        # left lobe scale: smaller, so the loop grows left to right (and never reads as glasses)
TALL = 1.75        # lobe height factor
WMIN, WMAX = 2.4, 14.0
NIB = math.radians(40)
EXIT_T = 2 * math.pi - 0.42    # where the ribbon leaves the right loop
SHAFT, HEAD_L, HEAD_W = 46.0, 30.0, 38.0


def centre(t):
    s, c = math.sin(t), math.cos(t)
    d = 1 + s * s
    x, y = A * c / d, -A * TALL * s * c / d
    if x < 0:
        x, y = x * LEFT, y * LEFT
    return x, y


def path_points(t0, t1, n):
    return [centre(t0 + (t1 - t0) * i / n) for i in range(n + 1)]


def tangent(pts, i):
    a, b = pts[max(i - 1, 0)], pts[min(i + 1, len(pts) - 1)]
    dx, dy = b[0] - a[0], b[1] - a[1]
    l = math.hypot(dx, dy) or 1
    return dx / l, dy / l


ANCHOR_EVERY = 12   # keep one anchor per this many samples; the curve between is a smooth cubic


def smooth(points):
    """Open Catmull-Rom through `points`, written as cubic Beziers (no intermediate L segments)."""
    p = [points[0]] + points + [points[-1]]
    out = []
    for i in range(1, len(p) - 2):
        p0, p1, p2, p3 = p[i - 1], p[i], p[i + 1], p[i + 2]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        out.append(f"C {c1[0]:.2f} {c1[1]:.2f} {c2[0]:.2f} {c2[1]:.2f} {p2[0]:.2f} {p2[1]:.2f}")
    return " ".join(out)


def ribbon(pts, w_at):
    """Filled calligraphic ribbon around a centreline (broad-nib width by direction).

    Each edge is reduced to a few anchors and drawn as smooth cubic curves, so the outline has
    clean geometry (anchor-point discipline) instead of hundreds of tiny straight segments."""
    left, right = [], []
    for i, p in enumerate(pts):
        tx, ty = tangent(pts, i)
        w = w_at(i / (len(pts) - 1), math.atan2(ty, tx)) / 2
        nx, ny = -ty, tx
        left.append((p[0] + nx * w, p[1] + ny * w))
        right.append((p[0] - nx * w, p[1] - ny * w))
    keep = sorted(set(list(range(0, len(pts), ANCHOR_EVERY)) + [len(pts) - 1]))
    lft, rgt = [left[i] for i in keep], [right[i] for i in keep][::-1]
    return (f"M {lft[0][0]:.2f} {lft[0][1]:.2f} {smooth(lft)} "
            f"L {rgt[0][0]:.2f} {rgt[0][1]:.2f} {smooth(rgt)} Z")


def nib(angle, wmin=WMIN, wmax=WMAX):
    return wmin + (wmax - wmin) * abs(math.sin(angle - NIB))


# Size variants (the guide's scalability rule: if it fails at 16px it is too detailed).
#   full: emblem with circuits and growth bars, for 64px and up
#   icon: ribbon and arrow only, bolder, for 24 to 64px
#   tiny: heavier still, for 16 to 24px favicons
VARIANTS = {
    "full": dict(wmin=WMIN, wmax=WMAX, taper=0.14, details=True, head=1.0),
    "icon": dict(wmin=7.0, wmax=17.0, taper=0.05, details=False, head=1.6),
    "tiny": dict(wmin=12.0, wmax=20.0, taper=0.0, details=False, head=1.9),
}


def centreline(t_start=0.32):
    """The stroke's centreline as one point list, for the draw-on animation mask."""
    pts = path_points(t_start, EXIT_T, 400)
    tx, ty = tangent(pts, len(pts) - 1)
    ex, ey = pts[-1]
    pts += [(ex + tx * (SHAFT + HEAD_L), ey + ty * (SHAFT + HEAD_L))]
    return pts


def build(colour="#e8b52f", ground=None, accent=None, variant="full"):
    v = VARIANTS[variant]
    accent = accent or colour
    # The stroke: starts as a fine hairline at the top of the right loop, crosses to the left loop,
    # loops round it, crosses back, sweeps under the right loop and leaves it as the arrow.
    t_start = 0.32
    pieces = [(t_start, math.pi / 2, 70), (math.pi / 2, 3 * math.pi / 2, 160), (3 * math.pi / 2, EXIT_T, 110)]
    total = sum(b - a for a, b, _ in pieces)
    done = 0.0
    shapes = []
    for a, b, n in pieces:
        pts = path_points(a, b, n)
        span = b - a
        def w_at(u, ang, done=done, span=span):
            g = (done + u * span) / total                    # 0..1 along the whole stroke
            taper = min(1.0, g / v["taper"]) ** 1.2 if v["taper"] else 1.0   # hairline start
            grow = 0.75 + 0.45 * g                           # gets bolder as it goes (growth)
            return max(0.9, nib(ang, v["wmin"], v["wmax"]) * taper * grow)
        shapes.append(ribbon(pts, w_at))
        done += span
    # Arrow: straight shaft along the exit tangent, then a head.
    end = path_points(EXIT_T - 0.02, EXIT_T, 2)
    tx, ty = tangent(end, 2)
    ex, ey = end[-1][0] - tx * 4, end[-1][1] - ty * 4    # start the shaft inside the ribbon: no seam
    w_end = max(0.9, nib(math.atan2(ty, tx), v["wmin"], v["wmax"]) * 1.2)   # same width the ribbon ends at
    sw = w_end
    sx, sy = ex + tx * SHAFT, ey + ty * SHAFT
    nx, ny = -ty, tx
    shaft = (f"M {ex + nx * w_end / 2:.2f} {ey + ny * w_end / 2:.2f} L {sx + nx * sw / 2:.2f} {sy + ny * sw / 2:.2f} "
             f"L {sx - nx * sw / 2:.2f} {sy - ny * sw / 2:.2f} L {ex - nx * w_end / 2:.2f} {ey - ny * w_end / 2:.2f} Z")
    hl, hw = HEAD_L * v["head"], HEAD_W * v["head"]
    tip = (sx + tx * hl, sy + ty * hl)
    head = (f"M {tip[0]:.2f} {tip[1]:.2f} L {sx + nx * hw / 2:.2f} {sy + ny * hw / 2:.2f} "
            f"L {sx + tx * 6:.2f} {sy + ty * 6:.2f} L {sx - nx * hw / 2:.2f} {sy - ny * hw / 2:.2f} Z")
    shapes += [shaft, head]
    ribbon_svg = "".join(f'<path class="rb" d="{d}" fill="{colour}"/>' for d in shapes)
    if not v["details"]:
        return ribbon_svg

    # AI circuitry in the left loop: traces with 45-degree bends ending in open nodes.
    cx = -A * LEFT * 0.56                       # inside the left loop, clear of the ribbon
    traces = [
        [(cx + 30, 0), (cx + 10, 0), (cx - 4, -14), (cx - 18, -14)],
        [(cx + 10, 0), (cx - 4, 14), (cx - 18, 14)],
        [(cx + 20, 0), (cx + 20, -14), (cx + 8, -26)],
        [(cx + 20, 0), (cx + 20, 14), (cx + 8, 26)],
        [(cx + 2, 0), (cx - 24, 0)],
        [(cx - 4, -14), (cx - 4, -32)],
        [(cx - 4, 14), (cx - 4, 32)],
    ]
    node_r = 4.2

    def stop_short(tr):
        """End each trace at the edge of its node ring, so hollow nodes work on any background."""
        (x1, y1), (x2, y2) = tr[-2], tr[-1]
        d = math.hypot(x2 - x1, y2 - y1)
        return tr[:-1] + [(x2 - (x2 - x1) / d * node_r, y2 - (y2 - y1) / d * node_r)]

    circuit = "".join(
        f'<polyline points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in stop_short(tr))}" fill="none" stroke="{colour}" '
        f'stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>'
        f'<circle cx="{tr[-1][0]:.1f}" cy="{tr[-1][1]:.1f}" r="{node_r}" fill="none" stroke="{colour}" stroke-width="2.6"/>'
        for tr in traces)

    # Business growth in the right loop: three bars rising left to right, bases on one line.
    base = 30.0
    bars = "".join(
        f'<rect class="bar bar{i}" x="{x:.1f}" y="{base - h:.1f}" width="13" height="{h:.1f}" rx="2" '
        f'fill="{accent if i == 2 else colour}"/>'
        for i, (x, h) in enumerate([(44, 20), (63, 36), (82, 54)]))
    return ribbon_svg + f'<g class="ai">{circuit}</g>' + bars


def viewbox(pad=16, head=1.9):
    """Tight box around the loops and the arrow (sized for the biggest arrowhead variant)."""
    xs, ys = [], []
    for t in [i / 400 * 2 * math.pi for i in range(401)]:
        x, y = centre(t); xs.append(x); ys.append(y)
    end = path_points(EXIT_T - 0.02, EXIT_T, 2)
    tx, ty = tangent(end, 2)
    ex, ey = end[-1]
    reach = SHAFT + HEAD_L * head
    tip = (ex + tx * reach, ey + ty * reach)
    side = HEAD_W * head / 2
    for sx, sy in ((tip[0], tip[1]), (ex + tx * SHAFT - ty * side, ey + ty * SHAFT + tx * side),
                   (ex + tx * SHAFT + ty * side, ey + ty * SHAFT - tx * side)):
        xs.append(sx); ys.append(sy)
    x0, y0 = min(xs) - pad, min(ys) - pad
    return x0, y0, max(xs) - x0 + pad, max(ys) - y0 + pad


def svg(colour, ground=None, accent=None, style="", variant="full"):
    x, y, w, h = viewbox()
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{x:.1f} {y:.1f} {w:.1f} {h:.1f}" style="{style}">'
            f'{build(colour, ground, accent, variant)}</svg>')


def faces():
    rows = [("Big Shoulders Display", "big-shoulders-display", 700), ("Barlow Condensed", "barlow-condensed", 600)]
    return "".join(f'@font-face{{font-family:"{f}";font-weight:{w};src:url("{(FONTS / p / "files" / f"{p}-latin-{w}-normal.woff2").as_uri()}")}}'
                   for f, p, w in rows)


def lockup(colour, text, ground, accent=None, width=460):
    return (f'<div style="display:flex;flex-direction:column;align-items:center;gap:14px;width:{width}px">'
            f'{svg(colour, ground, accent, "width:100%")}'
            f'<div style="font:700 {width * 0.16:.0f}px/0.9 \'Big Shoulders Display\';color:{text};letter-spacing:.03em">urelimitless</div>'
            f'<div style="font:600 {width * 0.043:.0f}px \'Barlow Condensed\';letter-spacing:.42em;color:{text};opacity:.8;margin-left:.42em">'
            f'GROW BEYOND LIMITS</div></div>')


if __name__ == "__main__":
    name = sys.argv[1] if len(sys.argv) > 1 else "emblem"
    small = "".join(f'<div style="width:{s}px">{svg("#efe6d6", "#1d1b19", "#e8b52f")}</div>' for s in (120, 64, 32))
    html = (f'<html><head><style>{faces()} body{{margin:0;display:grid;grid-template-columns:1fr 1fr;width:1400px}}'
            f'.c{{display:flex;align-items:center;justify-content:center;height:560px}}</style></head><body>'
            f'<div class="c" style="background:#1d1b19">{lockup("#efe6d6", "#efe6d6", "#1d1b19", "#e8b52f")}</div>'
            f'<div class="c" style="background:#fbf8f2">{lockup("#d9452f", "#d9452f", "#fbf8f2")}</div>'
            f'<div class="c" style="background:#efe6d6">{lockup("#16130f", "#16130f", "#efe6d6", "#d9452f")}</div>'
            f'<div class="c" style="background:#141210;gap:40px">{small}</div></body></html>')
    page = HERE / f"{name}.html"
    page.write_text(html, encoding="utf-8")
    subprocess.run([EDGE, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--window-size=1400,1120",
                    f"--screenshot={HERE / (name + '.png')}", page.as_uri()], check=True, capture_output=True, timeout=60)
    print(HERE / f"{name}.png")
