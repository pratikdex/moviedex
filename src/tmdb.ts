export type Movie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
};

export const GENRES = [
  "Action",
  "Animation",
  "Bollywood",
  "Comedy",
  "Drama",
  "Horror",
  "Romance",
  "Sci-Fi",
  "Thriller",
];

export async function suggest(genre: string): Promise<Movie> {
  const res = await fetch(`/api/suggest?genre=${encodeURIComponent(genre)}`);
  if (!res.ok) throw new Error(`${res.status} ${await res.text()}`);
  return res.json();
}
