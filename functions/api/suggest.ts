// Runs on Cloudflare Pages at /api/suggest; keeps TMDB_KEY off the client.
// Bollywood is a language, not a TMDB genre; fewer Hindi films reach 2000 votes
const GENRES: Record<string, string> = {
  Action: "with_genres=28&vote_count.gte=2000",
  Animation: "with_genres=16&vote_count.gte=2000",
  Bollywood: "with_original_language=hi&vote_count.gte=300",
  Comedy: "with_genres=35&vote_count.gte=2000",
  Drama: "with_genres=18&vote_count.gte=2000",
  Horror: "with_genres=27&vote_count.gte=2000",
  Romance: "with_genres=10749&vote_count.gte=2000",
  "Sci-Fi": "with_genres=878&vote_count.gte=2000",
  Thriller: "with_genres=53&vote_count.gte=2000",
};

export const onRequestGet = async ({
  request,
  env,
}: {
  request: Request;
  env: { TMDB_KEY?: string };
}) => {
  if (!env.TMDB_KEY) return new Response("TMDB_KEY not set", { status: 500 });
  const genre = new URL(request.url).searchParams.get("genre") ?? "";
  if (!Object.hasOwn(GENRES, genre)) return new Response("Unknown genre", { status: 400 });

  // shortcut: random pick from top 100 rated, not personalised; upgrade to /movie/{id}/recommendations
  const page = 1 + Math.floor(Math.random() * 5);
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${env.TMDB_KEY}&${GENRES[genre]}&sort_by=vote_average.desc&page=${page}`,
  );
  if (!res.ok) return new Response(`TMDB ${res.status}`, { status: 502 });
  const { results } = (await res.json()) as { results: unknown[] };
  if (!results.length) return new Response("No movies found", { status: 404 });
  return Response.json(results[Math.floor(Math.random() * results.length)]);
};
