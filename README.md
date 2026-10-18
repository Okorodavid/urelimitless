# urelimitless.com

The marketing site for urelimitless, an agency that picks and wires AI tools for companies and supplies the people who deliver the work.

Built with Vite, React, TypeScript, Tailwind CSS v4 and Motion. Fonts are self-hosted through Fontsource. No backend, no paid services.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:5173.

```bash
npm run build     # static output in dist/
npm run preview   # serve the build locally
```

## Edit the content

| What | Where |
|---|---|
| Projects in "Completed calls" | `src/data/projects.ts` |
| Companies, tools and people on the hero board, and the calls that patch through it | `src/data/board.ts` |
| Tools on the scrolling strip | `src/data/board.ts` (`toolStrip`) |
| The four services ("Lines") | `src/components/Lines.tsx` |
| How a call goes through | `src/components/HowItWorks.tsx` |
| Contact email, form endpoint, GitHub link | `src/config.ts` |
| Colours, fonts, plates, lamps, buttons | `src/index.css` (`@theme` block and `@layer components`) |

## Contact form

With `FORM_ENDPOINT` empty (the default) the form opens the visitor's mail app with the ticket pre-filled, addressed to `CONTACT_EMAIL`.

To receive tickets without a mail app, create a free form endpoint (Formspree and Web3Forms both have free tiers), paste its URL into `FORM_ENDPOINT` in `src/config.ts`, and the form will POST JSON to it instead.

## Deploy (free)

The build is static. Any of these work on their free tier:

- **Vercel**: import the repo, framework preset Vite, build `npm run build`, output `dist`.
- **Netlify**: same settings.
- **Cloudflare Pages**: build `npm run build`, output `dist`.

Then point `urelimitless.com` at the host (the domain is on Hostinger DNS). `ringleader.urelimitless.com` stays where it is.

## Design record

- `PRODUCT.md`: product truth the site must stay honest to.
- `DESIGN.md`: the visual system (the Switchboard world) as shipped.
- `.impeccable/`: the design decision round, surface brief and review captures.
