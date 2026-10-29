# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React + Tailwind CSS (user's choice, 2026-10-18). Static build, deployable on a free tier (Vercel, Netlify or Cloudflare Pages). No paid services anywhere in the site or its hosting.

## Users

Primary: a decision-maker at a company (founder, operations lead, product or engineering lead at a small or mid-sized business) who knows AI could speed up their work but does not know which tools fit, or has a concrete piece of work and needs a skilled person to deliver it. They arrive from a referral, a demo link, or a search, usually on a laptop during the work day, often on a phone from a chat link.

Secondary (confirmed as part of the model, no separate surface yet): skilled personnel (developers, designers, data and AI engineers) whom urelimitless places on client work.

## Product Purpose

urelimitless is an agency. It connects companies to the right AI tools and to the skilled people who deliver the work, matched to the skills the company needs. Success on the site: a visitor understands what the agency does within seconds, trusts it from the shipped projects, and starts a conversation (contact / book a call).

## Positioning

The agency does both halves of adoption in one place: it picks and wires the AI tools, and it supplies the people who actually ship with them. Proof is a portfolio of working products the founder has already built end to end (agents with human approval gates, graph investigators, savings vaults, social trading, AI video pipelines), not a list of logos.

## Operating Context

Services the site lists (confirmed):

1. AI tool matching and integration: audit a company's workflow and plug in the right AI tools (chatbots, automation, agents).
2. Skilled talent on demand: vetted developers, designers, data and AI engineers placed per project.
3. Custom AI builds: bespoke agents, bots and internal tools built by the agency.
4. Training and workshops: upskill a company's team on AI tools.

Engagement starts with a conversation; there is no self-serve checkout or pricing table.

## Capabilities and Constraints

- The site is a marketing surface: home page with services, projects, how it works, and a contact path.
- No backend. A contact form must use a free form endpoint or a mailto fallback; confirm before wiring any third-party service.
- Open: the real contact email, social handles, company location and any team names. Do not invent them; use clearly marked placeholders until the user supplies them.
- Open: whether a separate talent sign-up surface is wanted.

## Brand Commitments

- Name: **urelimitless**, written as one word, lowercase, never split into "U Re Limitless". It means "you're limitless": the owner's message to clients that they can achieve anything they set their minds to, and beyond (owner, 2026-10-29). The logo carries it: a rising U ("you") with an AI bot at its shoulder (`brand/logo/u-bot`).
- Domain: urelimitless.com (currently a parked Hostinger page). A live product already sits at ringleader.urelimitless.com, so subdomains are in use.
- Founder's GitHub: Okorodavid.
- Design references the user pointed to: 21st.dev (animated heroes, shaders, marquees, bento grids, number tickers, text reveals) for motion ideas. changefest.dev did not resolve on 2026-10-18.

## Evidence on Hand

Real shipped projects (all on this machine; paths relative to C:\Users\Uche\Desktop):

- **Ringleader** (`build grok bot/ringleader`): fraud ring investigator on FalkorDB for Graph Hacks (WeMakeDevs x FalkorDB), Track 01. One suspicious account in, the whole ring out, every link explained, nothing frozen without a human. Live: https://ringleader.urelimitless.com. Source: https://github.com/Okorodavid/ringleader. Stack: Python/FastAPI, FalkorDB, Gemini.
- **Stash** (`colosseum hackathon`): a dollar savings app a stolen key cannot drain. Per-user vault with daily allowance, timelocks and guardians. Built for Colosseum's Crypto World's Fair (Tempo track, Base and Solana). Foundry contracts deployed on Tempo and Base mainnet; Next.js PWA. Brand assets in `colosseum hackathon/brand/`.
- **Conviction** (`base builders grant`): social trading for Coinbase tokenized stocks on Base. Every position public, every fill a post, copy any trader with one tap. Next.js, Prisma, smart wallets. Mark at `base builders grant/public/conviction-mark.svg`.
- **Cadence** (`higgsfield project`): AI influencer and YouTube OS on the Higgsfield API. Set a character and a schedule; it produces shorts, UGC ads and faceless videos on a calendar. Next.js, job worker, ffmpeg.
- **My Bots** (`build grok bot`): self-hosted always-on bots you give real work to. Named bots with memory, workspaces, an approval gate for risky tools, routines, a Playwright browser per bot, live SSE transcript. Node 22, SQLite, Gemini.

Absent, must not be fabricated: client names, testimonials, revenue or headcount numbers, pricing, team members, certifications.

## Product Principles

1. Prove with shipped work. The projects section is the trust engine; every project shown is real and links to something runnable.
2. Two halves, one door. Tools and people are always presented together; the visitor never has to pick a lane before talking to us.
3. Say it in seconds. A company lead on a phone from a chat link should get what urelimitless does before the first scroll.
4. Motion with a job. Animation demonstrates the matching mechanism or guides the eye; it never decorates for its own sake.
5. Free to run. Everything ships on free tiers; no dependency that bills the owner.

## Accessibility & Inclusion

Standard WCAG AA for a public marketing site: keyboard-reachable navigation and contact path, reduced-motion respected for every animation, contrast at AA on all surfaces.
