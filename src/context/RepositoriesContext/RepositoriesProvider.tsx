import { FC } from "react";

import { PokeApiPokemonRepository, PokemonRepository } from "@/sections/Pokemon";
import {
	LocalStoragePokemonFavoriteRepository,
	PokemonFavoriteRepository,
} from "@/sections/PokemonFavorite";
import { PokeApiPokemonListRepository, PokemonListRepository } from "@/sections/PokemonList";

import { RepositoriesContext } from "./RepositoriesContext";

export interface RepositoriesState {
	pokemonRepository: PokemonRepository;
	pokemonListRepository: PokemonListRepository;
	pokemonFavoriteRepository: PokemonFavoriteRepository;
}

export const repositoriesInitialState: RepositoriesState = {
	pokemonRepository: new PokeApiPokemonRepository(),
	pokemonListRepository: new PokeApiPokemonListRepository(),
	pokemonFavoriteRepository: new LocalStoragePokemonFavoriteRepository(),
};

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const RepositoriesProvider: FC<Props> = ({ children }) => {
	return (
		<RepositoriesContext.Provider value={{ ...repositoriesInitialState }}>
			{children}
		</RepositoriesContext.Provider>
	);
};
