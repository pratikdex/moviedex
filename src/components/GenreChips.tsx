import { GENRES } from "../tmdb";

type Props = {
  selected: string | null;
  disabled: boolean;
  onSelect: (genre: string) => void;
};

function GenreChips({ selected, disabled, onSelect }: Props) {
  return (
    <div className="mb-16 flex flex-wrap gap-2">
      {Object.keys(GENRES).map((g) => (
        <button
          key={g}
          onClick={() => onSelect(g)}
          disabled={disabled}
          className={`cursor-pointer rounded-full border px-5 py-2 backdrop-blur transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-paper disabled:cursor-wait ${
            g === selected
              ? "border-paper bg-paper text-ink"
              : "border-white/20 bg-white/5 hover:bg-white/20"
          }`}
        >
          {g}
        </button>
      ))}
    </div>
  );
}

export default GenreChips;
