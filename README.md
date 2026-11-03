# Venue at Boschkop website

Six pages: Home, The venue, Events, Gallery, Packages, Contact. Built with Vite, React, TypeScript, Tailwind CSS and Lenis.

## Run it

```bash
npm install
npm run dev      # local preview at http://localhost:5173
npm run build    # production site in dist/
```

Upload the contents of `dist/` to any static host (Netlify, Vercel, Cloudflare Pages, cPanel…). Each page is its own folder (`/venue/`, `/events/` …), so no special server rules are needed.

## Editing

- **All text** is in `src/content.ts`. Search it for `TODO` for things to confirm before launch: prices, what each package includes, and the descriptions of the three spaces.
- **Prices:** set `price: 'From R2 500'` (for example) on a package, or a price on an extra. `null` shows "On request".
- **The 10% offer** hides itself after the `promo.until` date.
- **Photos:** put the original in `media/`, add a line to `scripts/prepare-media.mjs`, run `npm run media`, then use its name in `src/content.ts`.

## Enquiries

The contact form doesn't store anything. It opens WhatsApp (078 120 0669) or the visitor's email app (tanyabac@mweb.co.za) with the message already written.
