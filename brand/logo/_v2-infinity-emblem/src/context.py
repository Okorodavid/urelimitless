"""In-context sheet at real CSS pixel sizes (rendered at 2x like a phone screen):
the avatar-circle test, a Telegram chat list, a mobile site header, a browser tab, an email signature."""
from system import OUT, shoot, BAKE, CREAM, INK

from emblem import FONTS

u = lambda n: (OUT / n).as_uri()
FONT = (f'@font-face{{font-family:Barlow;src:url("{(FONTS / "barlow" / "files" / "barlow-latin-400-normal.woff2").as_uri()}")}}'
        f'@font-face{{font-family:Barlow;font-weight:600;src:url("{(FONTS / "barlow" / "files" / "barlow-latin-600-normal.woff2").as_uri()}")}}')


def circle(inner, size, bg=BAKE):
    return (f'<div style="width:{size}px;height:{size}px;border-radius:50%;background:{bg};display:flex;align-items:center;'
            f'justify-content:center;overflow:hidden;flex:none">{inner}</div>')


def img(name, w):
    return f'<img src="{u(name)}" style="width:{w}px;display:block">'


avatar_rows = ""
for label, name, k in [("Full logo (with name)", "urelimitless-lockup-stacked-dark.svg", .78),
                       ("Full emblem", "urelimitless-emblem-dark.svg", .80),
                       ("Icon (simplified)", "urelimitless-icon-dark.svg", .78)]:
    cells = "".join(f'<div class="av">{circle(img(name, round(s * k)), s)}<small>{s}px</small></div>' for s in (40, 48, 56, 96))
    avatar_rows += f'<div class="row"><b>{label}</b>{cells}</div>'

chat = "".join(
    f'<div class="chat">{circle(img("urelimitless-icon-dark.svg", 42), 54) if who == "urelimitless" else circle("", 54, col)}'
    f'<div><b>{who}</b><span>{msg}</span></div><time>{t}</time></div>'
    for who, msg, t, col in [("urelimitless", "Your AI support bot is live in the group.", "09:41", BAKE),
                             ("Ada · Founder", "Can we start the pilot on Monday?", "09:12", "#5a6b8c"),
                             ("Virtuals Africa", "Aman: only for virtuals?", "Yesterday", "#3d7a5a")])

css = f"""{FONT}*{{margin:0;box-sizing:border-box}}body{{background:#0b0a09;width:1400px;padding:24px;font-family:Barlow,sans-serif;color:#cfc3ad}}
.g{{display:grid;grid-template-columns:1fr 1fr;gap:16px}}.p{{background:#191715;border-radius:12px;padding:18px}}
h3{{font:600 14px Barlow;color:#efe6d6;margin-bottom:12px}}p.v{{font-size:13px;margin-top:12px;color:#a89c86}}
.row{{display:flex;align-items:center;gap:22px;margin:10px 0}}.row b{{width:170px;font:600 13px Barlow;color:#efe6d6}}
.av{{display:flex;flex-direction:column;align-items:center;gap:4px}}.av small{{font-size:11px;color:#8a7f6c}}
.phone{{width:390px;border-radius:22px;overflow:hidden;background:#fff;color:#111}}
.chat{{display:flex;align-items:center;gap:12px;padding:9px 14px;border-bottom:1px solid #eee}}
.chat b{{display:block;font:600 15px Barlow}}.chat span{{font-size:14px;color:#666}}.chat time{{margin-left:auto;font-size:12px;color:#999;align-self:flex-start}}
"""

html = f"""<html><head><meta charset="utf-8"><style>{css}</style></head><body><div class="g">
<div class="p" style="grid-column:span 2"><h3>Avatar test: the same circles at the sizes apps really use</h3>{avatar_rows}
<p class="v">Result: the name can't be read in any circle under 96px, and the full emblem's circuit and bars turn to noise at 40 to 56px.
The simplified icon stays clear at every size. Use the icon for every profile picture.</p></div>
<div class="p"><h3>Telegram chat list (54px avatar)</h3><div class="phone">{chat}</div>
<p class="v">The icon holds its own next to photos and initials.</p></div>
<div class="p"><h3>Mobile website header (390px wide)</h3>
<div class="phone" style="background:{BAKE}"><div style="display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid rgba(176,141,63,.4)">
{img("urelimitless-lockup-horizontal-dark.svg", 190)}<div style="width:22px;height:14px;border-top:2px solid {CREAM};border-bottom:2px solid {CREAM};position:relative"><i style="position:absolute;left:0;right:0;top:4px;border-top:2px solid {CREAM}"></i></div></div>
<div style="padding:26px 16px 30px;color:{CREAM};font:600 30px/1.05 Barlow">Grow beyond your limits with the right AI tools and people.</div></div>
<p class="v">The horizontal logo reads at 190px wide. Below about 150px, switch to the icon.</p>
<h3 style="margin-top:18px">Browser tab (16px favicon)</h3>
<div style="display:flex;align-items:center;gap:8px;background:#2b2a33;border-radius:8px 8px 0 0;padding:8px 12px;width:260px;color:#eee;font-size:13px">
{img("favicon.svg", 16)}urelimitless · AI tools and people</div>
<h3 style="margin-top:18px">Email signature (light mode)</h3>
<div style="background:#fff;color:#222;border-radius:8px;padding:14px 16px;font-size:14px;line-height:1.5">David Okoro<br>
<span style="color:#666">work@urelimitless.com</span><div style="margin-top:8px">{img("urelimitless-lockup-horizontal-light.svg", 170)}</div></div></div>
</div></body></html>"""

if __name__ == "__main__":
    page = OUT / "_ctx.html"
    page.write_text(html, encoding="utf-8")
    import subprocess
    from system import EDGE
    subprocess.run([EDGE, "--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=2",
                    "--window-size=1400,1150", f"--screenshot={OUT / 'urelimitless-in-context.png'}", page.as_uri()],
                   check=True, capture_output=True, timeout=90)
    page.unlink()
    print(OUT / "urelimitless-in-context.png")
