"""urelimitless U-bot logo kit (chosen variant "B · Normal", r4).

- symbol: the approved r4 drawing, unchanged
- small:  a small-size cut (bigger bot, visor slot only) for 24-64 px
- tiny:   favicon drawing (U + visor bot, no antenna) for 16-24 px
- wordmark: the r4 hand-built lettering with its strokes expanded to filled outlines (print-safe)
- lockups: horizontal (r4 proportions) and stacked, in black, white, blue, colour, colour-reversed
Run with a Python that has shapely (scratch venv).
"""
import math
import re
import shutil
from pathlib import Path

from shapely.geometry import LineString, Point, Polygon, MultiPolygon
from shapely.ops import unary_union

OUT = Path(r"C:\Users\Uche\Desktop\urelimitless\brand\logo")
K_DIR = OUT / "u-bot"
INK, PAPER, BLUE, SPARK, WHITE = "#0E1116", "#F6F5F1", "#2D4BFF", "#8EA2FF", "#FFFFFF"
# The website's Switchboard palette: cream logo with an amber "lamp" bot on bakelite
BAKE, CREAM, AMBER = "#1D1B19", "#EFE6D6", "#E8B52F"

U = "M40,112 L76,76 L76,150 A52,52 0 0 0 180,150 L180,58 L216,22 L216,150 A88,88 0 0 1 40,150 Z"


def disc(cx, cy, r):
    return f"M{cx - r},{cy} A{r},{r} 0 1 0 {cx + r},{cy} A{r},{r} 0 1 0 {cx - r},{cy} Z"


def pill(x, y, w, h):
    r = h / 2
    return f"M{x + r},{y} H{x + w - r} A{r},{r} 0 0 1 {x + w - r},{y + h} H{x + r} A{r},{r} 0 0 1 {x + r},{y} Z"


# ---------------------------------------------------------------- symbol drawings (U fill + bot fill)

def bot_full(cx, cy):
    """The approved bot: head with a visor cut-out, two eyes, antenna with a ball."""
    return (f'<path fill-rule="evenodd" class="bot" d="{disc(cx, cy, 30)} {pill(cx - 21, cy - 9, 42, 20)}"/>'
            f'<circle class="bot" cx="{cx - 9}" cy="{cy + 1}" r="5"/><circle class="bot" cx="{cx + 9}" cy="{cy + 1}" r="5"/>'
            f'<rect class="bot" x="{cx - 3}" y="{cy - 44}" width="6" height="16"/><circle class="bot" cx="{cx}" cy="{cy - 47}" r="6"/>')


def bot_small(cx, cy):
    """Small-size bot: bigger head with two round eye holes (a lone visor slot read as a minus sign),
    thicker antenna."""
    return (f'<path fill-rule="evenodd" class="bot" d="{disc(cx, cy, 36)} {disc(cx - 13, cy + 2, 8)} {disc(cx + 13, cy + 2, 8)}"/>'
            f'<rect class="bot" x="{cx - 5}" y="{cy - 52}" width="10" height="20"/><circle class="bot" cx="{cx}" cy="{cy - 55}" r="9"/>')


def bot_tiny(cx, cy):
    """Favicon bot: a solid head with two big eye holes; no antenna (it would be under a pixel)."""
    return f'<path fill-rule="evenodd" class="bot" d="{disc(cx, cy, 42)} {disc(cx - 15, cy + 2, 10)} {disc(cx + 15, cy + 2, 10)}"/>'


def fit(body, box, size=256, margin=14, nudge=-0.015):
    """Scale and centre a drawing whose bounds are `box` (x0,y0,x1,y1) into a size×size canvas, nudged up a hair."""
    x0, y0, x1, y1 = box
    s = (size - 2 * margin) / max(x1 - x0, y1 - y0)
    tx = size / 2 - (x0 + x1) / 2 * s
    ty = size / 2 - (y0 + y1) / 2 * s + nudge * size
    return f'<g transform="translate({tx:.2f},{ty:.2f}) scale({s:.4f})">{body}</g>'


SYMBOLS = {
    # approved r4 placement, unchanged
    "symbol": f'<g transform="translate(18.5,23.5) scale(0.92)"><path class="u" d="{U}"/>{bot_full(52, 38)}</g>',
    # bot centre keeps a 16-unit gap from the 45° slope (line x + y = 152)
    "small": fit(f'<path class="u" d="{U}"/>{bot_small(41, 37)}', (5, -27, 216, 238)),
    "tiny": fit(f'<path class="u" d="{U}"/>{bot_tiny(34, 33)}', (-8, -9, 216, 238), margin=8, nudge=0),
}


def paint(body, u, bot):
    return body.replace('class="u"', f'fill="{u}"').replace('class="bot"', f'fill="{bot}"')


# ---------------------------------------------------------------- wordmark: expand strokes to fills

HEAVY = ("M0,100 V160 A40,40 0 0 0 80,160 M80,100 V200 M134,100 V200 M134,145 A45,45 0 0 1 179,100 "
         "M232,150 H332 A50,50 0 1 0 317.36,185.36")
LIGHT = ("M392,50 V200 M435,100 V200 M478,100 V200 M478,135 A35,35 0 0 1 548,135 V200 M548,135 A35,35 0 0 1 618,135 V200 "
         "M661,100 V200 M718,62 V200 M700,100 H748 M787,50 V200 M830,150 H930 A50,50 0 1 0 915.36,185.36 "
         "M1033,114 C1023,98 975,96 975,124 C975,150 1035,146 1035,174 C1035,206 981,204 973,186 "
         "M1138,114 C1128,98 1080,96 1080,124 C1080,150 1140,146 1140,174 C1140,206 1086,204 1078,186")
DOTS = [(435, 66, 9.75), (661, 66, 9.75)]


def arc_points(x1, y1, rx, ry, phi, large, sweep, x2, y2, n=48):
    """SVG elliptical arc (endpoint form) sampled to points; here rx == ry and phi == 0."""
    r = rx
    dx, dy = (x1 - x2) / 2, (y1 - y2) / 2
    d2 = dx * dx + dy * dy
    r = max(r, math.sqrt(d2))
    f = math.sqrt(max(0.0, (r * r - d2) / d2)) if d2 else 0
    if large == sweep:
        f = -f
    cx, cy = (x1 + x2) / 2 + f * dy, (y1 + y2) / 2 - f * dx
    a1, a2 = math.atan2(y1 - cy, x1 - cx), math.atan2(y2 - cy, x2 - cx)
    da = a2 - a1
    if sweep and da < 0:
        da += 2 * math.pi
    if not sweep and da > 0:
        da -= 2 * math.pi
    return [(cx + r * math.cos(a1 + da * i / n), cy + r * math.sin(a1 + da * i / n)) for i in range(1, n + 1)]


def cubic_points(p0, p1, p2, p3, n=40):
    out = []
    for i in range(1, n + 1):
        t = i / n
        mt = 1 - t
        out.append((mt ** 3 * p0[0] + 3 * mt * mt * t * p1[0] + 3 * mt * t * t * p2[0] + t ** 3 * p3[0],
                    mt ** 3 * p0[1] + 3 * mt * mt * t * p1[1] + 3 * mt * t * t * p2[1] + t ** 3 * p3[1]))
    return out


def subpaths(d):
    toks = re.findall(r"[MVHLAC]|-?\d*\.?\d+", d)
    i, cur, paths, pt = 0, None, [], (0.0, 0.0)
    nums = lambda k: [float(t) for t in toks[i + 1:i + 1 + k]]
    while i < len(toks):
        c = toks[i]
        if c == "M":
            x, y = nums(2); pt = (x, y); cur = [pt]; paths.append(cur); i += 3
        elif c == "V":
            (y,) = nums(1); pt = (pt[0], y); cur.append(pt); i += 2
        elif c == "H":
            (x,) = nums(1); pt = (x, pt[1]); cur.append(pt); i += 2
        elif c == "L":
            x, y = nums(2); pt = (x, y); cur.append(pt); i += 3
        elif c == "A":
            rx, ry, phi, large, sweep, x, y = nums(7)
            cur += arc_points(pt[0], pt[1], rx, ry, phi, int(large), int(sweep), x, y); pt = (x, y); i += 8
        elif c == "C":
            a, b, cc, dd, x, y = nums(6)
            cur += cubic_points(pt, (a, b), (cc, dd), (x, y)); pt = (x, y); i += 7
        else:
            raise ValueError(c)
    return paths


def expand(d, width):
    return unary_union([LineString(p).buffer(width / 2, cap_style="round", join_style="round", quad_segs=24) for p in subpaths(d)])


def _turn(a, b, c):
    """Turning angle (degrees) at b."""
    a1 = math.atan2(b[1] - a[1], b[0] - a[0])
    a2 = math.atan2(c[1] - b[1], c[0] - b[0])
    d = abs(math.degrees(a2 - a1)) % 360
    return min(d, 360 - d)


def _catmull(points):
    out = []
    p = [points[0]] + points + [points[-1]]
    for i in range(1, len(p) - 2):
        p0, p1, p2, p3 = p[i - 1], p[i], p[i + 1], p[i + 2]
        c1 = (p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6)
        c2 = (p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6)
        out.append(f"C{c1[0]:.2f},{c1[1]:.2f} {c2[0]:.2f},{c2[1]:.2f} {p2[0]:.2f},{p2[1]:.2f}")
    return out


def _unit(dx, dy):
    l = math.hypot(dx, dy) or 1.0
    return dx / l, dy / l


def _ring_to_curves(pts, corner=28.0, long_edge=12.0, spacing=12.0):
    """Rebuild a dense polygon ring (round caps/joins sampled finely) as clean vector geometry:
    long straight edges stay exact lines, sharp corners stay sharp, and each curved stretch becomes a few
    cubic Beziers whose handle directions are the true tangents (Hermite fit), so the outline does not drift."""
    n = len(pts)
    edge_len = [math.dist(pts[i], pts[(i + 1) % n]) for i in range(n)]
    is_line = [l > long_edge for l in edge_len]
    is_corner = [_turn(pts[i - 1], pts[i], pts[(i + 1) % n]) > corner for i in range(n)]
    # break points: corners, and vertices where a line edge meets a curve edge
    brk = [i for i in range(n) if is_corner[i] or is_line[i] != is_line[i - 1]]
    if not brk:
        brk = [0]

    def tangent(j, run_start, run_end, prev_line, next_line):
        if j == run_start and prev_line is not None:
            return prev_line
        if j == run_end and next_line is not None:
            return next_line
        a, b = pts[(j - 1) % n], pts[(j + 1) % n]
        if j == run_start and is_corner[j % n]:
            a = pts[j % n]
        if j == run_end and is_corner[j % n]:
            b = pts[j % n]
        return _unit(b[0] - a[0], b[1] - a[1])

    cmds = [f"M{pts[brk[0]][0]:.2f},{pts[brk[0]][1]:.2f}"]
    for bi, start in enumerate(brk):
        end = brk[(bi + 1) % len(brk)]
        span = (end - start) % n or n
        if is_line[start]:                                   # a run of line edges: straight segments
            for k in range(1, span + 1):
                x, y = pts[(start + k) % n]
                cmds.append(f"L{x:.2f},{y:.2f}")
            continue
        prev_line = (_unit(pts[start % n][0] - pts[(start - 1) % n][0], pts[start % n][1] - pts[(start - 1) % n][1])
                     if is_line[(start - 1) % n] and not is_corner[start] else None)
        e = (start + span) % n
        next_line = (_unit(pts[(e + 1) % n][0] - pts[e][0], pts[(e + 1) % n][1] - pts[e][1])
                     if is_line[e] and not is_corner[e] else None)
        # anchors along the curved run, about every `spacing` units of arc
        idx, acc = [start], 0.0
        for k in range(1, span):
            acc += edge_len[(start + k - 1) % n]
            if acc >= spacing:
                idx.append(start + k)
                acc = 0.0
        if len(idx) > 1 and acc < spacing / 3:
            idx.pop()
        idx.append(start + span)
        for a, b in zip(idx, idx[1:]):
            pa, pb = pts[a % n], pts[b % n]
            ta = tangent(a, start, start + span, prev_line, next_line)
            tb = tangent(b, start, start + span, prev_line, next_line)
            d = sum(edge_len[k % n] for k in range(a, b)) / 3
            cmds.append(f"C{pa[0] + ta[0] * d:.2f},{pa[1] + ta[1] * d:.2f} {pb[0] - tb[0] * d:.2f},{pb[1] - tb[1] * d:.2f} "
                        f"{pb[0]:.2f},{pb[1]:.2f}")
    return " ".join(cmds) + " Z"


def poly_d(geom):
    polys = [geom] if isinstance(geom, Polygon) else list(geom.geoms)
    parts = []
    for p in polys:
        for ring in [p.exterior, *p.interiors]:
            parts.append(_ring_to_curves(list(ring.coords)[:-1]))
    return " ".join(parts)


wm_geom = unary_union([expand(HEAVY, 24), expand(LIGHT, 13)] + [Point(x, y).buffer(r, quad_segs=24) for x, y, r in DOTS])
wm_geom = wm_geom.simplify(0.01, preserve_topology=True)   # only drops collinear points; curves are fitted below
WORDMARK_D = poly_d(wm_geom)
WM_BOX = wm_geom.bounds          # x0, y0, x1, y1 in wordmark units


def wordmark(fill):
    return f'<path fill="{fill}" fill-rule="evenodd" d="{WORDMARK_D}"/>'


# ---------------------------------------------------------------- files

def svg(view, body, title="urelimitless logo"):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{view}" role="img" aria-label="{title}">'
            f'<title>{title}</title>{body}</svg>\n')


# name -> (U colour, bot colour, wordmark colour, intended background)
SCHEMES = {
    "black": (INK, INK, INK, PAPER),
    "white": (WHITE, WHITE, WHITE, INK),
    "blue": (BLUE, BLUE, BLUE, PAPER),
    "colour": (INK, BLUE, INK, PAPER),
    "colour-reversed": (WHITE, SPARK, WHITE, INK),
    "switchboard": (CREAM, AMBER, CREAM, BAKE),     # the website's colours
}


def horizontal(scheme):
    u, b, w, _ = SCHEMES[scheme]
    s = 0.62                                   # the approved r4 lockup proportions
    x1 = 296 + WM_BOX[2] * s
    body = paint(SYMBOLS["symbol"], u, b) + f'<g transform="translate(296,50.5) scale({s})">{wordmark(w)}</g>'
    return svg(f"0 0 {x1 + 20:.0f} 256", body)


def stacked(scheme):
    u, b, w, _ = SCHEMES[scheme]
    s = 0.40
    wm_w = (WM_BOX[2] - WM_BOX[0]) * s
    width = max(256, wm_w) + 40
    sx = (width - 256) / 2
    top = 256 + 6
    body = (f'<g transform="translate({sx:.2f},0)">{paint(SYMBOLS["symbol"], u, b)}</g>'
            f'<g transform="translate({(width - wm_w) / 2 - WM_BOX[0] * s:.2f},{top - WM_BOX[1] * s:.2f}) scale({s})">{wordmark(w)}</g>')
    height = top + (WM_BOX[3] - WM_BOX[1]) * s + 24
    return svg(f"0 0 {width:.0f} {height:.0f}", body)


def tile(drawing, fg_u, fg_b, bg, size=512, radius=0.22, k=0.66):
    inner = paint(SYMBOLS[drawing], fg_u, fg_b)
    s = size * k / 256
    off = size * (1 - k) / 2
    return svg(f"0 0 {size} {size}", f'<rect width="{size}" height="{size}" rx="{size * radius:.0f}" fill="{bg}"/>'
               f'<g transform="translate({off:.1f},{off:.1f}) scale({s:.4f})">{inner}</g>', "urelimitless app icon")


def wordmark_only(scheme):
    w = SCHEMES[scheme][2]
    x0, y0, x1, y1 = WM_BOX
    return svg(f"{x0 - 10:.1f} {y0 - 10:.1f} {x1 - x0 + 20:.1f} {y1 - y0 + 20:.1f}", wordmark(w), "urelimitless wordmark")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    keep = {"_v1-infinity-rejected", "_v2-infinity-emblem", "u-bot"}
    old = OUT / "_v2-infinity-emblem"
    if not old.exists():
        old.mkdir()
        for f in list(OUT.iterdir()):
            if f.name not in keep:
                shutil.move(str(f), old / f.name)
    K = OUT / "u-bot"
    for sub in ("symbol", "lockup", "icon", "wordmark", "motion"):
        (K / sub).mkdir(parents=True, exist_ok=True)
    files = {}
    for name in ("symbol", "small", "tiny"):
        for sc in SCHEMES:
            u, b, _, _ = SCHEMES[sc]
            files[f"symbol/urelimitless-{name}-{sc}.svg"] = svg("0 0 256 256", paint(SYMBOLS[name], u, b))
    for sc in SCHEMES:
        files[f"lockup/urelimitless-horizontal-{sc}.svg"] = horizontal(sc)
        files[f"lockup/urelimitless-stacked-{sc}.svg"] = stacked(sc)
    for sc in ("black", "white", "blue"):
        files[f"wordmark/urelimitless-wordmark-{sc}.svg"] = wordmark_only(sc)
    files["icon/urelimitless-app-icon-ink.svg"] = tile("small", WHITE, SPARK, INK)
    files["icon/urelimitless-app-icon-blue.svg"] = tile("small", WHITE, WHITE, BLUE)
    files["icon/urelimitless-avatar.svg"] = tile("small", WHITE, SPARK, INK, radius=0.5, k=0.62)
    files["icon/urelimitless-app-icon-switchboard.svg"] = tile("small", CREAM, AMBER, BAKE)
    files["icon/urelimitless-avatar-switchboard.svg"] = tile("small", CREAM, AMBER, BAKE, radius=0.5, k=0.62)
    # Browser-tab favicon: always on its own dark tile, so it shows on light and dark tab bars alike.
    # It matches the website (cream + amber on bakelite).
    files["icon/favicon.svg"] = tile("tiny", CREAM, AMBER, BAKE, size=64, radius=0.22, k=0.86)
    files["icon/favicon-ink.svg"] = tile("tiny", WHITE, SPARK, INK, size=64, radius=0.22, k=0.86)
    for rel, text in files.items():
        (K / rel).write_text(text, encoding="utf-8")
    anchors = len(re.findall(r"[MLC]", WORDMARK_D))
    print(f"{len(files)} files; wordmark outline: {anchors} points, bounds {tuple(round(v, 1) for v in WM_BOX)}")
