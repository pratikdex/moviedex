# moviedex

Pick a genre, get one great movie to watch tonight. Built with React, TypeScript, Vite and Tailwind CSS; data from [TMDB](https://www.themoviedb.org/).

*This product uses the TMDB API but is not endorsed or certified by TMDB.*

## How it works

The browser calls `/api/suggest?genre=...`, a Cloudflare Worker in `worker/index.ts`; `wrangler.jsonc` serves `dist/` as static assets and routes `/api/*` to the Worker. The function holds the TMDB key, so it never reaches the client bundle.

## Run locally

1. Get a free API key at themoviedb.org (Settings → API).
2. Create `.dev.vars` (git-ignored) containing `TMDB_KEY=your_key`.
3. `npm install`
4. `npm run build && npx wrangler dev`

`npm run dev` serves the UI with hot reload, but `/api/suggest` isn't available there.

## Deploy (Cloudflare Workers)

1. Workers & Pages → Create → connect this repo.
2. Build command `npm run build`, deploy command `npx wrangler deploy`.
3. Settings → Variables and Secrets: add the secret `TMDB_KEY`.
