# moviedex

Pick a genre, get one great movie to watch tonight. Built with React, TypeScript, Vite and Tailwind CSS; data from [TMDB](https://www.themoviedb.org/).

*This product uses the TMDB API but is not endorsed or certified by TMDB.*

## How it works

The browser calls `/api/suggest?genre=...`, a Cloudflare Pages Function in `functions/api/suggest.ts`. The function holds the TMDB key, so it never reaches the client bundle.

## Run locally

1. Get a free API key at themoviedb.org (Settings → API).
2. Create `.dev.vars` (git-ignored) containing `TMDB_KEY=your_key`.
3. `npm install`
4. `npm run build && npx wrangler pages dev dist`

`npm run dev` serves the UI with hot reload, but `/api/suggest` isn't available there.

## Deploy (Cloudflare Pages)

1. Workers & Pages → Create → Pages → connect this repo.
2. Build command `npm run build`, output directory `dist`.
3. Add the environment variable `TMDB_KEY` (no `VITE_` prefix).
