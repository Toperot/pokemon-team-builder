import React from "react";
import { useTeam } from "../contexts/TeamContext";

export default function TeamView() {
  const { team, removePokemon, clearTeam } = useTeam();

  // create 6 slots
  const slots = Array.from({ length: 6 }).map((_, i) => team[i] || null);

  return (
    <div className="sticky top-6 border-4 border-black rounded-xl bg-red-600 shadow-lg overflow-hidden">
      {/* Indicator lights */}
      <div className="flex gap-2 p-3 border-b-4 border-black bg-red-700">
        <div className="w-4 h-4 rounded-full bg-green-400 border border-black"></div>
        <div className="w-4 h-4 rounded-full bg-yellow-400 border border-black"></div>
        <div className="w-4 h-4 rounded-full bg-red-500 border border-black"></div>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between p-3 bg-red-700 border-b-4 border-black">
        <h2 className="text-lg text-yellow-200 drop-shadow">
          Your Team
        </h2>
        <button
          onClick={clearTeam}
          className="text-xs text-white hover:text-yellow-200"
        >
          Clear
        </button>
      </div>

      {/* Team slots */}
      <div className="p-3 bg-red-500">
        <div className="grid grid-cols-2 gap-3">
          {slots.map((p, idx) => (
            <div
              key={idx}
              className="relative h-28 border-2 border-black rounded-md flex items-center justify-center p-2 bg-gray-100 cursor-pointer"
              onClick={() => p && removePokemon(p.id)}
              title={p ? "Click to remove" : "Empty slot"}
            >
              {p ? (
                <div className="flex flex-col items-center text-center w-full">
                  <img
                    src={p.sprites.front_default}
                    alt={p.name}
                    className="w-12 h-12 object-contain mb-1"
                  />
                  <div className="font-medium capitalize text-sm truncate w-full">
                    {p.name}
                  </div>
                  <div className="text-xs text-gray-500">#{p.id}</div>
                  <button
                    className="absolute top-1 right-1 text-red-600 font-bold"
                    onClick={(e) => {
                      e.stopPropagation();
                      removePokemon(p.id);
                    }}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="text-gray-400">Empty</div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 text-sm text-white">
          <strong>{team.length}</strong>/6 slots used.
        </div>
      </div>
    </div>
  );
}
