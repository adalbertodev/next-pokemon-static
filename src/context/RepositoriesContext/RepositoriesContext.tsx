import { createContext, useContext } from "react";

import { PokemonRepository } from "@/sections/Pokemon";
import { PokemonFavoriteRepository } from "@/sections/PokemonFavorite";
import { PokemonListRepository } from "@/sections/PokemonList";

interface RepositoriesContextProps {
	pokemonRepository: PokemonRepository;
	pokemonListRepository: PokemonListRepository;
	pokemonFavoriteRepository: PokemonFavoriteRepository;
}

export const RepositoriesContext = createContext({} as RepositoriesContextProps);

export const useRepositoriesContext = (): RepositoriesContextProps => {
	return useContext(RepositoriesContext);
};
