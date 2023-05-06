import React, { useContext, useState } from "react";

const PokemonContext = React.createContext();
const PokemonDetailContext = React.createContext();

export function usePokemonInfo() {
  return useContext(PokemonContext);
}

export function useGetPokemonInfo() {
  return useContext(PokemonDetailContext);
}

export function PokemonProvider({ children }) {
  const [pokemonInfo, setPokemonInfo] = useState([]);

  return (
    <PokemonContext.Provider value={pokemonInfo}>
      <PokemonDetailContext.Provider value={setPokemonInfo}>
        {children}
      </PokemonDetailContext.Provider>
    </PokemonContext.Provider>
  );
}
