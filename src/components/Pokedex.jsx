import React, { useMemo, useState } from "react";
import useFetch from "../hooks/useFetch";
import PokemonCard from "./PokemonCard";
import { useTeam } from "../contexts/TeamContext";
import SearchBar from "./SearchBar";

const POKEMON_URL = "https://pokeapi.co/api/v2/pokemon?limit=151";

export default function Pokedex() {
  const { data: pokemonList, loading, error } = useFetch(POKEMON_URL, {
    resolveDetails: true,
  });
  const { team, addPokemon } = useTeam();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!pokemonList) return [];
    const q = query.trim().toLowerCase();
    if (!q) return pokemonList;
    return pokemonList.filter((p) => {
      if (p.name.toLowerCase().includes(q)) return true;
      if (p.types.some((t) => t.toLowerCase().includes(q))) return true;
      return false;
    });
  }, [pokemonList, query]);

  if (loading) return <div className="p-6">Loading Pokédex...</div>;
  if (error)
    return (
      <div className="p-6 text-red-600">
        Error loading Pokédex: {String(error.message)}
      </div>
    );

  return (
    <div className="flex flex-col h-[calc(100vh-3rem)] border-4 border-black rounded-xl bg-red-600 shadow-lg">
      {/* Sticky header inside scroll container */}
      <div className="shrink-0 sticky top-0 z-20 bg-red-700 p-3 border-b-4 border-black">
        {/* indicator lights */}
        <div className="flex gap-2 mb-3">
          <div className="w-4 h-4 rounded-full bg-green-400 border border-black"></div>
          <div className="w-4 h-4 rounded-full bg-yellow-400 border border-black"></div>
          <div className="w-4 h-4 rounded-full bg-red-500 border border-black"></div>
        </div>

        <h2 className="text-2xl pixel-font text-yellow-200 drop-shadow mb-2">
          Pokédex
        </h2>
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {/* Scrollable grid */}
      <div className="flex-1 overflow-y-auto p-3 bg-red-500">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
          {filtered.map((p) => {
            const inTeam = team.some((t) => t.id === p.id);
            const teamFull = team.length >= 6;
            return (
              <PokemonCard
                key={p.id}
                pokemon={p}
                onAdd={addPokemon}
                inTeam={inTeam}
                teamFull={teamFull}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
