# DinoTeam

Website for DinoTeam, a personal sports coaching business (Seine-et-Marne, 77): coaching offers, clothing collection, partner network, FAQ and contact.

Built with Vue 3 (`<script setup>`), Vue Router and Vite. Deployed on Vercel, with one serverless function for the contact form.

## Getting started

Requires Node.js 20+.

```bash
npm install
npm run dev        # dev server (the /api function is not served, use `vercel dev` for it)
```

| Command              | What it does                         |
| -------------------- | ------------------------------------ |
| `npm run dev`        | Start the Vite dev server            |
| `npm run build`      | Production build into `dist/`        |
| `npm run preview`    | Serve the production build locally   |
| `npm run lint`       | ESLint (JS + Vue)                    |
| `npm test`           | Run the Vitest suite once            |
| `npm run test:watch` | Vitest in watch mode                 |

## Project structure

```
api/contact.js         Vercel function: contact form -> e-mail via Resend
tests/                 Vitest suites (kept out of api/, where every file becomes a Vercel function)
src/config/site.js     Central settings: coach name, booking/shop URLs, socials, Google reviews, rubrics
src/data/              Editable content: offers, FAQ, testimonials, partners, products, legal pages
src/views/             One view per route (Coaching, Boutique, Collaborations, FAQ, legal, 404)
src/components/        Header, menu, footer, page transition and page sections
src/composables/       Page meta tags and the route transition state
src/directives/        v-reveal (scroll-in animations)
src/style.css          Design tokens and global styles
vercel.json            SPA rewrite and security headers
```

Most content changes only touch `src/config/site.js` or a file in `src/data/`. Values in `[BRACKETS]` are placeholders waiting for the client's content.

## Contact form

`api/contact.js` validates the request (size, fields, honeypot, fill time) and sends the message with [Resend](https://resend.com). Copy `.env.example` and set the variables in the Vercel project:

| Variable             | Purpose                                                      |
| -------------------- | ------------------------------------------------------------ |
| `RESEND_API_KEY`     | Resend API key (secret)                                      |
| `CONTACT_TO_EMAIL`   | Inbox that receives the messages                             |
| `CONTACT_FROM_EMAIL` | Sender; needs a domain verified in Resend to reach any inbox |

## Security headers

`vercel.json` sets a strict Content Security Policy: everything is self-hosted (fonts, images, scripts) and the only network call is `/api/contact`. Embedding a third-party widget (Calendly inline, Google Maps, analytics...) requires adding its domains to the CSP.
