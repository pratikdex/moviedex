import type { Movie } from "../tmdb";

type Props = {
  movie: Movie;
  loading: boolean;
  onAnother: () => void;
};

function MovieCard({ movie, loading, onAnother }: Props) {
  return (
    // key restarts the entrance animation on every new suggestion
    <article
      key={movie.id}
      className={`grid animate-enter items-end gap-6 transition-opacity motion-reduce:animate-none md:grid-cols-[300px_1fr] md:gap-12 ${
        loading ? "opacity-50" : ""
      }`}
    >
      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} poster`}
          className="w-60 rounded-md shadow-[0_30px_80px_rgba(0,0,0,0.6)] md:w-full"
        />
      )}
      <div>
        <h2 className="font-display text-3xl leading-tight font-extrabold tracking-tight break-words md:text-5xl">
          {movie.title}
        </h2>
        <p className="mt-4 mb-6 flex gap-4 text-muted">
          <span className="font-bold text-paper">★ {movie.vote_average.toFixed(1)}</span>
          <span>{movie.release_date.slice(0, 4)}</span>
        </p>
        <p className="mb-8 max-w-[52ch] leading-relaxed text-paper/85">{movie.overview}</p>
        <button
          onClick={onAnother}
          disabled={loading}
          className="cursor-pointer rounded-full bg-paper px-6 py-3 font-bold text-ink transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper disabled:cursor-wait"
        >
          Suggest another
        </button>
      </div>
    </article>
  );
}

export default MovieCard;
