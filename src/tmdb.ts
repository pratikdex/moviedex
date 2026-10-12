export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

// Bollywood is a language, not a TMDB genre; fewer Hindi films reach 2000 votes
export const GENRES: Record<string, string> = {
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

export const HAS_KEY = Boolean(import.meta.env.VITE_TMDB_KEY);

export async function suggest(genre: string): Promise<Movie> {
  // shortcut: random pick from top 100 rated, not personalised; upgrade to /movie/{id}/recommendations
  const page = 1 + Math.floor(Math.random() * 5);
  const url =
    `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}` +
    `&${GENRES[genre]}&sort_by=vote_average.desc&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`TMDB ${res.status}`);
  const { results }: { results: Movie[] } = await res.json();
  return results[Math.floor(Math.random() * results.length)];
}
