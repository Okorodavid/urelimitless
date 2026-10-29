"""Outline the wordmark "urelimitless" from Big Shoulders Display 900 (the site's display face)."""
from pathlib import Path

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.ttLib import TTFont

FONTS = Path(r"C:\Users\Uche\Desktop\urelimitless\node_modules\@fontsource")
DISPLAY = FONTS / "big-shoulders-display" / "files" / "big-shoulders-display-latin-900-normal.woff2"


def outline(text: str, size: float, font_path: Path = DISPLAY, tracking: float = 0.0):
    """Return (svg path d, width, cap_height, x_height) for `text` set at `size` px, baseline at y=0."""
    font = TTFont(str(font_path))
    upm = font["head"].unitsPerEm
    scale = size / upm
    cmap = font.getBestCmap()
    glyphs = font.getGlyphSet()
    hmtx = font["hmtx"]
    pen = SVGPathPen(glyphs)
    x = 0.0
    for ch in text:
        name = cmap[ord(ch)]
        tpen = TransformPen(pen, (scale, 0, 0, -scale, x, 0))
        glyphs[name].draw(tpen)
        x += hmtx[name][0] * scale + tracking * size
    x -= tracking * size
    os2 = font["OS/2"]
    return pen.getCommands(), x, os2.sCapHeight * scale, os2.sxHeight * scale


if __name__ == "__main__":
    d, w, cap, xh = outline("urelimitless", 100)
    print(len(d), w, cap, xh)
