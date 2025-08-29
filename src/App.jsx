import React from "react";
import Pokedex from "./components/Pokedex";
import TeamView from "./components/TeamView";

export default function App() {
  return (
    <div className="min-h-screen bg-blue-100 text-gray-900">
      <header className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-extrabold text-red-600 mb-4 text-outline">Dream Pokémon Team Builder</h1>
        <p className="mt-1 font-bold text-sm text-black-600 mb-4">Pick up to 6 from the first 151 Pokémon.</p>
      </header>

      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <section className="lg:col-span-3">
          <Pokedex />
        </section>

        <aside className="lg:col-span-1">
          <TeamView />
        </aside>
      </main>

      <footer className="max-w-6xl mx-auto p-6 text-sm text-gray-500">
        Data from <a className="underline" href="https://pokeapi.co">PokéAPI</a>.
      </footer>
    </div>
  );
}
