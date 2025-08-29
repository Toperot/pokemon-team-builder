import React from "react";

export default function PokemonCard({ pokemon, onAdd, inTeam, teamFull }) {
  const sprite = pokemon.sprites?.front_default;

  let label = "Add to Team";
  let disabled = false;

  if (inTeam) {
    label = "Added";
    disabled = true;
  } else if (teamFull) {
    label = "Team Full";
    disabled = true;
  }

  return (
    <div className="border rounded-lg p-3 flex flex-col items-center bg-white shadow-sm">
      <div className="w-24 h-24 mb-2">
        {sprite ? (
          <img src={sprite} alt={pokemon.name} className="w-full h-full object-contain" />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">—</div>
        )}
      </div>

      <div className="text-center">
        <div className="font-semibold capitalize">{pokemon.name}</div>
        <div className="text-xs text-gray-500">#{pokemon.id}</div>
        <div className="mt-2 flex gap-2 justify-center flex-wrap">
          {pokemon.types.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-gray-100">
              {t}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => onAdd(pokemon)}
        disabled={disabled}
        className={`mt-3 px-3 py-1 rounded-md w-full font-medium ${
          disabled
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-sky-600 text-white hover:bg-sky-700"
        }`}
      >
        {label}
      </button>
    </div>
  );
}
