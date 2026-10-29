# urelimitless logo: the U-bot

**The idea in one sentence:** a rising U ("you") with a friendly AI bot hovering at its shoulder: you, with AI on your side, going up. *You're limitless.*

Approved design: variant **"B · Normal"** (r4) from the design session, with the left arm's original 45° cut and the bot hovering above the slope. The main symbol is unchanged from the approved drawing.

## Which file do I use?

| Where | File | Rule |
|---|---|---|
| Profile picture (LinkedIn, X, Telegram, WhatsApp, Instagram) | `icon/urelimitless-avatar.svg`, or `web/icon-512.png` for uploads | Always the **symbol**, never the name. The name can't be read in a circle under 96px. |
| Website header | `lockup/urelimitless-horizontal-black.svg` (light site), `-white.svg` (dark site), `-colour.svg` (blue bot) | At least **140px wide**. Smaller than that, use the symbol. |
| Website favicon and phone home screen | everything in `web/`: paste `web/head-snippet.html` into the site's `<head>` and copy the files to the site root | The favicon has its own dark tile, so it shows on light and dark browser tabs. |
| Hero, slides, posters, merch | `lockup/urelimitless-stacked-*.svg` | At least 100px wide. |
| Email signature | `lockup/urelimitless-horizontal-colour.svg` at about 170px wide | |
| Small symbol, 24 to 64px (app UI, chat stickers, small badges) | `symbol/urelimitless-small-*.svg` | A bigger bot with two eyes, drawn to stay readable small. |
| Tiny, 16 to 24px | `symbol/urelimitless-tiny-*.svg` | No antenna, because it would be under a pixel. |
| Symbol, 64px and up | `symbol/urelimitless-symbol-*.svg` | The full approved drawing. |
| Name only (rare) | `wordmark/urelimitless-wordmark-*.svg` | Only where the symbol already appears nearby. |
| Website intro or video | `motion/urelimitless-intro-dark.svg` / `-light.svg` | The U rises, the bot lifts off the slope and bobs twice, then the name slides in (about 2s). Reduced motion shows the finished logo. |
| Fun loop (404 page, loading, social) | `motion/urelimitless-mascot-loop.html` | The bot rides round the U, hops off the peak and lands back. Click to replay. |
| Print, signs, vinyl, embroidery | the **SVG** files (`-black` or `-white` for one colour) | All lettering is filled outlines, so there's nothing to install and it's safe for cutters. Ask for a physical proof before a big run. |

Colour names in the file names: **black** = ink logo for light backgrounds · **white** = for dark backgrounds · **blue** = all Limitless Blue · **colour** = ink with a blue bot · **colour-reversed** = white with a Spark bot, for dark backgrounds · **switchboard** = cream with an amber bot, for the website's dark bakelite colours.

**The website uses the switchboard version** (`-switchboard` files, `icon/favicon.svg`, and everything in `web/`): a cream U and name with an amber bot that glows like the site's lamps and buttons. The blue versions are for places outside the website that should use the blue palette.

## Clear space and minimum size

- **Clear space:** keep empty space at least the **width of the bot's head** on every side of the logo.
- **Minimum size:** horizontal logo 140px wide (35mm in print). Stacked logo 100px (25mm). Full symbol 64px, small symbol 24px, tiny symbol 16px.

## Colours

| Name | HEX | RGB | Use |
|---|---|---|---|
| Ink | `#0E1116` | 14, 17, 22 | Logo on light backgrounds, dark backgrounds |
| Limitless Blue | `#2D4BFF` | 45, 75, 255 | The bot (accent), blue backgrounds |
| Spark | `#8EA2FF` | 142, 162, 255 | The bot on dark backgrounds |
| Paper | `#F6F5F1` | 246, 245, 241 | Light background |
| White | `#FFFFFF` | 255, 255, 255 | Logo on dark or blue |
| Cream (website) | `#EFE6D6` | 239, 230, 214 | Logo on the website's dark background |
| Lamp Amber (website) | `#E8B52F` | 232, 181, 47 | The bot on the website |
| Bakelite (website) | `#1D1B19` | 29, 27, 25 | The website's background, favicon and app-icon tile |

For print, ask the printer to match these HEX colours, or to proof against a Pantone guide. I haven't assigned official CMYK or Pantone values. The blue is very saturated and won't print exactly in standard CMYK; expect it slightly duller.

## Please don't

- stretch, tilt or outline the logo, or add shadows or gradients
- move the bot to a different spot, or use it apart from the U (except in the motion pieces)
- put the full name in a profile picture
- put the black logo on a dark background (use white or colour-reversed)
- recolour the bot in anything except Limitless Blue, Spark, Lamp Amber, ink or white

## Quality checks done

- **Logo-skill audit:** symbol 100/100, small and tiny cuts 99/100, horizontal logo 99/100. One colour each, no gradients, no live text.
- **Wordmark:** the original lettering's lines were converted to filled outlines. They were checked against the original at large size (no difference visible) and cut from 1,685 to 320 points.
- **`test-sheet.png`:** size ladder down to 16px, pixel test, 7 backgrounds, greyscale, one colour, reversed, blur, mirrored and rotated, browser tab, app grid, avatar, website header, business card, and a side-by-side with reference AI logos.
- **Small cuts:** a visor-only bot read as a minus sign, so the small sizes use two round eyes instead.

## Before you print in quantity

- Run a quick **trademark search** for "urelimitless" and the symbol in your country (e.g. a search of Nigeria's trademark registry, plus a reverse image search). I can't guarantee clearance.
- Show the logo to 3 to 5 people for 5 seconds, hide it, and ask what they remember and how it made them feel. You want words like *friendly, smart, rising, AI*.

## Rebuilding

`src/kit.py` builds every static file, and `src/motion.py` builds the motion. They need Python with `shapely`. The previous directions are kept in `../_v1-infinity-rejected/` and `../_v2-infinity-emblem/`.
