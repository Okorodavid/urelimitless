---
name: urelimitless
description: The Switchboard. A telephone-exchange operator's board in bakelite, brass and cream traffolyte, patching companies through to AI tools and the people who ship with them.
colors:
  bakelite: "#1d1b19"
  bakelite-deep: "#141210"
  panel: "#262321"
  panel-hi: "#312c28"
  cream: "#efe6d6"
  cream-dim: "#cfc3ad"
  cream-mute: "#a89c86"
  ink: "#16130f"
  brass: "#b08d3f"
  brass-hi: "#e2c26f"
  brass-lo: "#6d5424"
  amber: "#e8b52f"
  cord-red: "#d9452f"
  cord-blue: "#2f8fd9"
  lamp-off: "#4a3b1f"
typography:
  display:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(3.4rem, 4.2vw, 6rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.005em"
  headline:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(2.8rem, 3vw, 4.4rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.005em"
  title:
    fontFamily: "Big Shoulders Display, Arial Narrow, sans-serif"
    fontSize: "clamp(1.9rem, 2vw, 2.4rem)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-0.005em"
  body:
    fontFamily: "Barlow, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: "normal"
  label:
    fontFamily: "Barlow Condensed, Arial Narrow, sans-serif"
    fontSize: "0.66rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.16em"
  ticket:
    fontFamily: "Special Elite, Courier New, monospace"
    fontSize: "0.95rem"
    fontWeight: 400
    lineHeight: 1.375
    letterSpacing: "normal"
rounded:
  engrave: "2px"
  plate: "3px"
  ticket: "4px"
  button: "6px"
  panel: "14px"
  jack: "50%"
spacing:
  hairline: "1px"
  xs: "8px"
  sm: "12px"
  md: "20px"
  lg: "24px"
  xl: "40px"
  section: "80px"
  section-lg: "112px"
  container: "1400px"
components:
  button-primary:
    backgroundColor: "{colors.amber}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "1.05em 1.5em 1em"
  button-primary-hover:
    backgroundColor: "#efbe3a"
    textColor: "{colors.ink}"
  button-secondary:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.cream}"
    typography: "{typography.label}"
    rounded: "{rounded.button}"
    padding: "1.05em 1.5em 1em"
  plate:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "0.5em 0.8em 0.45em"
  plate-dark:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.cream-dim}"
    typography: "{typography.label}"
    rounded: "{rounded.plate}"
    padding: "0.5em 0.8em 0.45em"
  panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.cream}"
    rounded: "{rounded.panel}"
    padding: "8px"
  paper:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink}"
    rounded: "{rounded.ticket}"
    padding: "28px 24px 32px"
  input-ticket:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    typography: "{typography.ticket}"
    rounded: "0"
    padding: "6px 0"
  toggle:
    backgroundColor: "{colors.brass}"
    rounded: "{rounded.panel}"
    width: "28px"
    height: "46px"
  lamp:
    backgroundColor: "{colors.lamp-off}"
    rounded: "{rounded.jack}"
    size: "0.7em"
  lamp-lit:
    backgroundColor: "{colors.amber}"
    rounded: "{rounded.jack}"
    size: "0.7em"
  screw:
    backgroundColor: "{colors.brass}"
    rounded: "{rounded.jack}"
    size: "12px"
---

# Design System: urelimitless

## Overview

**Creative North Star: "The Switchboard"**

The site is a telephone exchange operator's board. The ground is warm bakelite near-black with a soft radial sheen pooled toward the upper left; rendered panels sit one step lighter on it, framed by a brass hairline and four slotted brass screws. Everything a visitor reads is either engraved into a cream traffolyte plate (labels, navigation, tool names, statuses), set in heavy condensed display caps directly on the bakelite (headlines), or typed on a toll ticket (examples, requests, the form). The three cord colors, signal red, exchange blue and lamp amber, carry the only saturated color on the page and appear only on cords, lamps, carets and the primary pushbutton.

Controls are physical. Buttons have a visible 3px sole and depress on press; toggles have a bat handle that flicks through 180 degrees; jewel lamps sit dark on a brass collar until a line is live, then glow. Depth comes from inset bevels and short, dark drop shadows on each material, never from a floating-card vocabulary. Motion has a job: cords draw themselves along a catenary, lamps light when a line connects, tickets settle in on scroll, and all of it stops (static, lit, connected) under reduced motion.

Density is editorial: one 1400px column, generous 80 to 112px section rhythm, left-weighted headlines against brass hairlines, and long lists (lines, calls) divided by rules rather than boxed into same-size cards. The build refuses the category default (centred gradient headline, logo row, bento of feature cards on navy) and the white SaaS grid alike.

**Key Characteristics:**
- Warm bakelite ground with a fixed radial sheen; panels one step lighter with a brass hairline and corner screws
- Cream traffolyte plates with engraved uppercase labels are the universal small-text container
- Display headlines in Big Shoulders Display 900, uppercase, line-height 0.92, set in cream directly on the ground
- Three cord colors only: signal red, exchange blue, lamp amber; amber doubles as the one call-to-action color
- Physical controls: pushbutton travel, bat toggles, jewel lamps on brass collars
- Toll-ticket typewriter voice (Special Elite) for examples, requests, readouts and the request form
- Reduced motion leaves every cord drawn and every lamp lit

## Colors

A bakelite-and-brass palette: four warm near-blacks, three creams, three brasses, one amber, and two cord colors; nothing cool except the exchange blue cord.

### Primary
- **Lamp Amber** (`amber`): the incandescent color. Primary pushbutton face, lit jewel lamps, the station cord in How It Works, text selection, the focus ring, and connected-state readout text. It is the only call-to-action color on the page.
- **Brass** (`brass`): jack rings, screw heads, toggle collars, panel hairlines (at 35 to 55% alpha), section rules (at 30 to 40% alpha) and the scrollbar thumb. Always rendered as a radial bevel from `brass-hi` through `brass` to `brass-lo`, never as a flat fill.
- **Brass Highlight** (`brass-hi`): the bevel's catch-light and the color of small field labels on dark ground (hero dl terms, "Open"/"Closed", project year, line subheads).
- **Brass Shadow** (`brass-lo`): the bevel's turned-away edge, the lamp collar ring when a lamp is off, the ticket readout stroke, and the scrollbar gradient's end.

### Secondary
- **Signal Red** (`cord-red`): the company-to-tool cord, the text caret in inputs, required-field asterisks and the form's error line. Never a background.
- **Exchange Blue** (`cord-blue`): the tool-to-person cord, the faint ruled lines on ticket paper (at 18% alpha), the input focus underline on paper, and text selection inside paper. Never a background.

### Neutral
- **Bakelite** (`bakelite`): page ground; the body background is a fixed radial gradient from `#2b2724` at the upper left through `bakelite` to `bakelite-deep`. Also the sticky header strip at 85% alpha.
- **Deep Bakelite** (`bakelite-deep`): the lower end of the sheen, the ground of the How It Works and Ring sections (at 60% alpha over the body), the tool strip (70%), inline ticket chips, and the scrollbar track.
- **Panel** / **Panel Highlight** (`panel`, `panel-hi`): rendered panel bodies and dark plates, always as a vertical gradient from `panel-hi` to `panel` with a 6% white inset at the top edge.
- **Cream** (`cream`): display headlines, body text on dark ground, plate faces (as the middle stop of a `#f6eedf` to `#e3d8c2` gradient), ticket text that must read as primary.
- **Cream Dim** (`cream-dim`): running body copy on dark ground and dark-plate text. The default paragraph color.
- **Cream Mute** (`cream-mute`): captions, small labels that name a field ("Requested", "Tools wired"), ticket numbers, the footer copyright and the "PATCHING…" readout.
- **Ink** (`ink`): text engraved into cream (plates, pushbutton face, paper, form fields); the paper's ruled divider at 80% alpha; placeholder text at 60%.
- **Lamp Off** (`lamp-off`): a dark jewel lamp, as the outer stop of a radial from `#6b5a36`.

### Named Rules
**The Cord Rule.** Saturated color belongs to cords, lamps and the primary pushbutton. Red and blue never fill a surface; amber fills exactly one kind of surface, the primary button.

**The Bevel Rule.** Brass is never flat. Every brass element (jack, screw, toggle collar, plug, mark) is a radial gradient lit from 35% / 30% with stops `brass-hi` at 0, `brass` at 45%, `brass-lo` at 100%; hairlines use `brass` at reduced alpha.

**The Two Grounds Rule.** Text lives on one of two grounds: cream-on-bakelite (headlines, body) or ink-on-cream (plates, paper, primary button). There is no third text pairing.

## Typography

**Display Font:** Big Shoulders Display (with Arial Narrow, sans-serif), weights 700 and 900 self-hosted
**Body Font:** Barlow (with system-ui, sans-serif), weights 400, 500, 600 self-hosted
**Label Font:** Barlow Condensed (with Arial Narrow, sans-serif), weights 500, 600, 700 self-hosted
**Ticket Font:** Special Elite (with Courier New, monospace), weight 400 self-hosted

**Character:** Loud American wood-type display against a quiet, workmanlike grotesque, with engraved condensed caps on every plate and a typewriter voice for anything that reads as a ticket. The pairing is industrial signage, not editorial serif.

### Hierarchy
- **Display** (900, 3.4rem on mobile rising through 4.6rem at sm, 3.8rem at lg, 5rem at xl, 6rem at 2xl; line-height 0.92; letter-spacing -0.005em; uppercase; `text-wrap: balance`): the hero headline only. Sits in the left 5/12 column beside the board.
- **Headline** (900, 2.8rem rising to 3.6rem at sm, with 4.2 to 4.4rem at lg for Completed calls and Ring the operator; same leading and tracking; uppercase): section titles, ending in a full stop.
- **Project title** (900, 3rem rising to 3.8rem and 4.4rem; line-height 0.9; uppercase): each completed-call name, set at headline scale so the proof reads as the loudest thing in its row.
- **Title** (900, 1.9 to 2.4rem; uppercase): line titles and step titles inside panels and lists.
- **Logo** (since 2026-10-29): the U-bot lockup from `brand/logo/u-bot`, drawn by `src/components/Logo.tsx` (`LogoLockup`): its own hand-built lettering ("ure" heavy, "limitless" light), not set in a font. On this site it uses the kit's "switchboard" colourway: the U and name in `cream` (currentColor via `text-cream`) and the bot in `amber`, so the bot reads as one more lit lamp (the Cord Rule allows amber on lamps). The favicon, app icons and link-preview image use the same colours on bakelite. Header height 36px on phones and 44px from sm; footer 36px; never under 140px wide. "urelimitless" is always one lowercase word. Usage rules: `brand/logo/u-bot/README.md`.
- **Body** (400, 1.0625rem base; hero lede 1.1 to 1.2rem with relaxed leading; line-height 1.55; `cream-dim`): paragraphs capped between 30rem and 42rem measure.
- **Small body** (0.95rem and 0.85rem): hero dl values, footer links, the board caption, status copy.
- **Label** (600, 0.6 to 0.72rem; tracking 0.16em; uppercase; line-height 1): engraved plate text, field names, navigation. Plates themselves track at 0.14em; the SVG plates on the board at 0.12em (jack labels) and 0.16em (column headers).
- **Line subhead** (Barlow Condensed 600, 1.1rem, tracking 0.08em, uppercase, `brass-hi`): the one-line summary under each line title.
- **Pushbutton** (Barlow Condensed 700, 1.05rem default, 0.8 to 0.95rem in dense placements; tracking 0.16em; uppercase).
- **Ticket** (Special Elite 400, 0.85 to 1.05rem; leading snug 1.375): example tickets, the board readout (13px / 12px), request lines, ticket numbers, the form heading and every form field.

### Named Rules
**The Engraving Rule.** Text on a plate is uppercase Barlow Condensed with a 1px white highlight below and a dark shadow above (`text-shadow: 0 1px 0 rgba(255,255,255,.85), 0 -1px 0 rgba(0,0,0,.45)`), so it reads as cut into the material. In SVG the same effect is three stacked text nodes: 45% black one unit above, 80% white one unit below, ink between.

**The Ticket Voice Rule.** Anything the operator would type on a toll ticket (examples, requests, readouts, form fields, ticket numbers, the contact email) is set in Special Elite. Nothing else is.

**The Full Stop Rule.** Headlines and section titles end in a period. Labels and plates never do.

## Layout

One centred column, max-width 1400px, with gutters of 16px (base), 24px (sm, 640px) and 40px (lg, 1024px). Sections carry 80px vertical padding, rising to 112px at lg; the hero is tighter (40px top / 64px bottom, 56px / 96px at lg, 40px top at xl). Breakpoints are Tailwind's defaults: sm 640, md 768, lg 1024, xl 1280, 2xl 1536.

The hero is a 12-column grid at lg: copy in 5 columns, the patch bay panel in 7, gap 32 to 40px; below lg the two stack with the copy first and a 40px gap. Lines uses 4 + 8 (intro beside the panel); Ring the operator uses 5 + 7 with the paper starting at column 6. Completed calls rows are 4 + 5 + 3 at md, each with 40px vertical padding (48px at lg) between brass hairlines. How It Works runs three columns at md with the station cord routed through the measured jack centres; below md the steps stack and the cord is not drawn.

Internal rhythm is small and consistent: a label sits 8px above its content, paragraph groups step by 20 or 24px, a dl sits 24px under its brass rule. Panels have 8 to 12px of inner padding with screws inset 8px at each corner; panel rows inside Lines are 28 to 32px vertical by 20 to 32px horizontal. The board SVG is 640 x 716 and scrolls sideways under 520px rather than shrinking its plates.

Alternating ground: Hero, Lines and Completed calls sit on the body sheen; the tool strip, How It Works and Ring the operator sit on `bakelite-deep` at 60 to 70% alpha, separated by a brass hairline at 30 to 40% alpha.

## Elevation & Depth

Depth is material, not atmospheric. Every surface describes its own edge with a short inset highlight (1px white at 6 to 75% alpha, stronger on cream) and an inset shadow at its lower edge, plus a tight dark drop shadow; large panels add a single long, heavily negative-spread shadow so they sit on the bakelite rather than float above it. There is no ambient glow except the jewel lamp halo. Cords cast a 5px offset drop shadow in the SVG so they read as hanging in front of the board.

### Shadow Vocabulary
- **Plate** (`box-shadow: inset 0 1px 0 rgba(255,255,255,.75), inset 0 -1px 0 rgba(0,0,0,.22), 0 1px 2px rgba(0,0,0,.6), 0 6px 14px -8px rgba(0,0,0,.8)`): every cream traffolyte plate.
- **Dark plate** (`box-shadow: inset 0 1px 0 rgba(255,255,255,.07), inset 0 -1px 0 rgba(0,0,0,.5), 0 1px 2px rgba(0,0,0,.6)`): plates on the bakelite ground.
- **Panel** (`box-shadow: inset 0 1px 0 rgba(255,255,255,.06), inset 0 -2px 0 rgba(0,0,0,.5), 0 24px 48px -24px rgba(0,0,0,.9)`): rendered panels.
- **Paper** (`box-shadow: 0 1px 0 rgba(255,255,255,.6) inset, 0 30px 60px -30px rgba(0,0,0,.9), 0 2px 4px rgba(0,0,0,.5)`): the ticket form.
- **Pushbutton sole, primary** (`box-shadow: inset 0 1px 0 rgba(255,255,255,.5), 0 3px 0 #8a6412, 0 10px 20px -8px rgba(232,181,47,.6)`): the 3px sole is the travel; on `:active` it collapses to `0 0 0` while the button translates 3px down.
- **Pushbutton sole, secondary** (`box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 0 0 1px rgba(176,141,63,.55), 0 3px 0 #0e0c0a`): brass ring at 55% alpha, full brass on hover.
- **Lamp off** (`box-shadow: inset 0 0 0 1px rgba(0,0,0,.5), 0 0 0 2px var(--color-brass-lo)`); **Lamp lit** (`box-shadow: inset 0 0 0 1px rgba(0,0,0,.3), 0 0 0 2px var(--color-brass), 0 0 12px 2px rgba(232,181,47,.55)`): the only glow in the system.
- **Screw** (`box-shadow: 0 1px 2px rgba(0,0,0,.8), inset 0 -1px 1px rgba(0,0,0,.5)`); **Toggle collar** (`box-shadow: inset 0 2px 4px rgba(0,0,0,.6), 0 1px 1px rgba(255,255,255,.08)`); **Bat** (`box-shadow: 0 2px 3px rgba(0,0,0,.8), inset 0 1px 0 rgba(255,255,255,.12)`).

### Named Rules
**The Sole Rule.** A pushbutton's depth is a 3px hard sole beneath it, and pressing removes exactly that 3px. No other element uses a hard offset shadow; panels and paper use the long negative-spread shadow.

**The Lamp Glow Rule.** Glow is reserved for lit lamps (12px amber halo) and the connected lamp on the board readout (SVG blur 5). Panel edges, buttons and text never glow.

## Shapes

Small radii on fabricated parts, round on turned parts. Plates are near-square (3px; 2px when drawn in SVG on the board); ticket readouts and inline ticket chips 4px; pushbuttons and the bat handle 6px; panels and the toggle capsule 14px. Jacks, lamps, screws and plugs are circles. Every jack on the board is a jack seen face-on: brass bevel ring, dark socket, black contact, with a 5px-radius lamp at the upper right. (This was also the brand mark until 2026-10-29; the brand mark is now the U-bot logo, see Typography › Logo.)

Borders are brass hairlines at reduced alpha (1px, 30 to 55%), never solid cream or white. Form fields on paper are a single ink underline at 40% alpha, no box. The paper form has a 2px ink rule at 80% under its ticket heading. The tool strip fades its ends with a horizontal mask (transparent to 6%, 94% to transparent). The body sheen is a fixed `radial-gradient(120% 70% at 30% -10%)`.

## Components

### Buttons (pushbuttons)
- **Shape:** squared with slight rounding (6px), label font Barlow Condensed 700, 1.05rem, tracked 0.16em uppercase, padding 1.05em 1.5em 1em, inline-flex with 0.7em gap, usually leading with a jewel lamp.
- **Primary:** amber face as a vertical gradient `#f3c84a` to `amber` at 55% to `#c9951f`, ink text, the amber sole and warm halo. Hover brightens the gradient (`#f8d35f` / `#efbe3a` / `#d19d22`). The lamp inside a primary button is lit; it goes dark while a form is sending.
- **Secondary:** panel gradient face, cream text, brass ring at 55% alpha and a near-black sole; hover takes the ring to full brass.
- **Press:** `transform: translateY(3px)` in 0.12s ease-out-expo while the sole collapses. Transitions: transform and box-shadow 0.12s, background 0.2s.
- **Focus:** the global ring, 2px amber outline offset 3px with 2px radius.

### Plates (chips and labels)
- **Style:** cream traffolyte gradient (`#f6eedf` / `cream` / `#e3d8c2`), ink engraved text, 3px radius, padding 0.5em 0.8em 0.45em, 0.5em gap for an inline lamp. Sizes run 0.6rem (line numbers), 0.62rem (tool chips, statuses), 0.68 to 0.72rem (nav, marquee), 0.8rem (mobile nav, full width).
- **Dark variant:** panel gradient, `cream-dim` text, used for the "On the board" strip label and the footer "Exchange open" status.
- **State:** a plate carrying a lamp lights the lamp on hover or focus of its `.group` parent (navigation) or when the state is live (statuses, footer).

### Panels
- **Corner style:** 14px.
- **Background:** panel gradient with a 6% white sheen at the upper left; 1px brass border at 35% alpha; four 12px brass screws inset 8px at the corners, each slot rotated by a per-screw `--slot` angle so none match.
- **Internal padding:** 8 to 12px around the board; list rows inside use 28 to 32px vertical and 20 to 32px horizontal, divided by brass hairlines at 30%.

### Paper (the ticket form)
- **Style:** cream gradient `#f7f0e1` to `cream` with blue ruled lines every 32px at 18% alpha, ink text, 4px radius, padding 28px top / 24px sides / 32px bottom (36px sides at sm). Heading row in Special Elite under a 2px ink rule.
- **Fields:** Special Elite 1.05rem, transparent, single ink underline at 40%, 6px vertical padding, label above in Barlow Condensed 0.66rem at ink 70%. Placeholder ink at 60%, caret signal red.
- **Focus:** underline turns exchange blue; outline suppressed on fields only.
- **Error:** signal-red Special Elite line with a 1px red left rule, `role="alert"`.
- **Submit:** primary pushbutton with its lamp; adjacent status copy in Special Elite at ink 70%, `aria-live="polite"`.

### Navigation
- **Header:** sticky, bakelite at 85% with a 4px backdrop blur, brass hairline below at 40%, 12px vertical padding. The U-bot logo at left; three cream plates with dark lamps as links (0.72rem, lamp lights on hover or focus); primary pushbutton "Patch us in" ("Patch in" under sm) with a lit lamp at right.
- **Mobile:** below md the plates collapse behind a secondary pushbutton labelled "Board" / "Close" that opens a stacked list of full-width plates under a brass hairline.
- **Footer:** the U-bot logo at 36px high, dark plate "Exchange open" with a lit lamp; links in `cream-dim` that go `cream` on hover; copyright in `cream-mute`.

### Toggle
- **Shape:** 28 x 46px brass capsule (14px radius) with an inset well and a 10px near-black pivot; a 12 x 30px bat handle (6px radius, dark gradient) hinged at the top.
- **State:** off points the bat down (`rotate(180deg) translateY(2px)`); on flicks it up over 0.3s ease-out-expo. In Lines a row's toggle flips on when 60% of the row enters the viewport, its lamp lights, and its "Closed" label reads "Open". Under reduced motion every toggle starts on.

### Jewel lamp
- **Shape:** 0.7em circle on a 2px collar. Off is a dark brown radial on a `brass-lo` collar; lit is a `#fff2b8` to `amber` to `#b9821a` radial on a `brass` collar with the 12px amber halo. Transition 0.35s ease-out-expo.

### Patch bay (signature)
A 640 x 716 SVG board inside a panel. Three columns of jacks at x 100, 320, 540 (companies, tools, people) under cream column-header plates; rows spread evenly between y 138 and 586. Each jack is a dark halo (r+4 at 60%), brass bevel ring (r 17, 15 for the tool column), socket, black contact, a 5px jewel lamp at the upper right, and an engraved plate 124 x 22 below. Cords are 8px round-capped Bezier paths with a catenary sag of 64px plus 12% of the vertical drop, braided with a 4/8 dash of 40% black and a 3px 50% white dash offset 2px up, under a 5px drop shadow; red from company to tool, blue from tool to person, 7px brass plugs at each live end. A 56px readout strip at the foot (`#120f0d`, `brass-lo` stroke, 4px radius) shows the line in Special Elite with a lamp that lights on CONNECTED. The loop: draw A 0.95s, draw B 0.95s, hold 2.8s, clear 0.42s, next call. Hovering or focusing a company jack patches that line by hand; each company jack is a keyboard button with an amber 2px focus ring. Under reduced motion the first call is drawn and lit and nothing loops.

### Station jack and cord (How It Works)
A 52px jack with a brass plug seated in it marks each step; at md and above a 6px amber cord with a 2.5px 35% white 3/6 dash runs through the three measured jack centres with a 42px sag, drawing over 1.6s on first view.

### Tool strip (marquee)
A dark plate "On the board" beside a horizontally masked row of cream plates duplicated once and translated -50% over 48s, pausing on hover; a screen-reader list carries the names. Under reduced motion it wraps as a static grid.

## Do's and Don'ts

### Do:
- **Do** put every small uppercase label on a traffolyte plate or set it as a label in `brass-hi` or `cream-mute`; plates are the chip, the tag, the nav item and the status.
- **Do** render brass as the three-stop radial bevel and hairlines as `brass` at 30 to 55% alpha.
- **Do** lead a primary pushbutton with a lit lamp and give every pushbutton its 3px sole and 3px travel.
- **Do** set anything ticket-like in Special Elite, including form fields, and keep the request form on cream paper with ruled lines.
- **Do** keep headlines uppercase Big Shoulders Display 900 at line-height 0.92 in cream, ending in a full stop, and keep the wordmark lowercase and normal case.
- **Do** divide long lists with brass hairlines and asymmetric grid columns (4+8, 5+7, 4+5+3) rather than equal cards.
- **Do** give every motion a reduced-motion end state that is drawn, lit and connected (cords at full length, toggles on, lamps lit, marquee static).
- **Do** keep amber for the focus ring (2px outline, 3px offset) and for selection.

### Don't:
- **Don't** use gradient text; display type is flat cream.
- **Don't** put red or blue on a surface; they are cords, carets, rules and error text only.
- **Don't** glow anything but a lamp; no glowing panel edges, no neon outlines, no colored button halos beyond the primary's warm sole shadow.
- **Don't** use frosted or translucent content surfaces; the sticky header strip at 85% bakelite with a 4px blur is the single translucent element and stays that way.
- **Don't** use hard offset shadows on anything but the pushbutton sole.
- **Don't** flatten brass to a solid fill or draw borders in cream or white.
- **Don't** set a plate's text in mixed case, or a headline without its period.
- **Don't** introduce a third text pairing (for example cream text on cream, or amber running copy); amber text is for connected readouts and ticket examples only.
