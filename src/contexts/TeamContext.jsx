import React, { createContext, useContext, useEffect, useState } from "react";
import { loadFromStorage, saveToStorage } from "../utils/localStorage";

const TeamContext = createContext();

export function useTeam() {
  return useContext(TeamContext);
}

export function TeamProvider({ children }) {
  const [team, setTeam] = useState(() => loadFromStorage("dream-team") || []);

  useEffect(() => {
    saveToStorage("dream-team", team);
  }, [team]);

  function addPokemon(pokemon) {
    setTeam((prev) => {
      if (prev.find((p) => p.id === pokemon.id)) return prev;
      if (prev.length >= 6) return prev;
      return [...prev, pokemon];
    });
  }

  function removePokemon(pokemonId) {
    setTeam((prev) => prev.filter((p) => p.id !== pokemonId));
  }

  function clearTeam() {
    setTeam([]);
  }

  return (
    <TeamContext.Provider value={{ team, addPokemon, removePokemon, clearTeam }}>
      {children}
    </TeamContext.Provider>
  );
}
