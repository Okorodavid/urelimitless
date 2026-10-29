"""Anchor-point audit: count path anchors in an emblem SVG, and overlay it in outline mode."""
import re
import sys
from pathlib import Path

text = Path(sys.argv[1]).read_text(encoding="utf-8")
paths = re.findall(r' d="([^"]+)"', text)
anchors = sum(len(re.findall(r"[MLCZ]", d)) - d.count("Z") for d in paths)
straight = sum(d.count(" L ") for d in paths)
print(f"{Path(sys.argv[1]).name}: {len(paths)} paths, {anchors} anchors, {straight} straight joins")
