import { useState } from "react";
import GenreChips from "./components/GenreChips";
import Logo from "./components/Logo";
import MovieCard from "./components/MovieCard";
import { suggest, type Movie } from "./tmdb";

function App() {
  const [genre, setGenre] = useState<string | null>(null);
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const pick = async (name: string) => {
    setGenre(name);
    setLoading(true);
    setError("");
    try {
      setMovie(await suggest(name));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {movie?.poster_path && (
        <div
          className="fixed -inset-[10%] -z-10 bg-cover bg-center opacity-55 blur-[90px] saturate-150 transition-[background-image] duration-500"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w185${movie.poster_path})`,
          }}
        />
      )}
      <main className="mx-auto max-w-4xl px-6 pt-12 pb-20">
        <Logo />
        <h1 className="mb-8 max-w-[16ch] font-display text-4xl leading-none font-extrabold tracking-tight md:text-6xl">What are you in the mood for?</h1>
        {error && <p className="mb-4 text-red-300">Couldn't load a movie ({error}). Try again.</p>}

        <GenreChips selected={genre} disabled={loading} onSelect={pick} />

        {movie && !error ? (
          <MovieCard
            movie={movie}
            loading={loading}
            onAnother={() => genre && pick(genre)}
          />
        ) : (
          !error && <p className="text-lg text-muted">Pick a genre and get one great movie to watch tonight.</p>
        )}
      </main>
    </>
  );
}

export default App;
