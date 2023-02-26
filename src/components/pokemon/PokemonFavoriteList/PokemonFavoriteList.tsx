import { useEffect, useState } from "react";

import { useRepositoriesContext } from "@/context/RepositoriesContext";
import { usePokemonFavorite } from "@/hooks";
import { PokemonFavorite } from "@/sections/PokemonFavorite";
import { SmallPokemon } from "@/sections/PokemonList";

import { NoFavorites } from "../NoFavorites";
import { PokemonCardList } from "../PokemonCardList";

export const PokemonFavoriteList = () => {
	const { pokemonListRepository, pokemonFavoriteRepository } = useRepositoriesContext();

	const [favoritePokemons, setFavoritePokemons] = useState<PokemonFavorite[]>([]);
	const [smallPokemons, setSmallPokemons] = useState<SmallPokemon[]>([]);
	const { search } = usePokemonFavorite(pokemonFavoriteRepository);

	useEffect(() => {
		search()
			.then((pokemonFavorites) => setFavoritePokemons(pokemonFavorites))
			.catch((error: Error) => console.error(error));
	}, [search]);

	useEffect(() => {
		pokemonListRepository
			.searchByIds(favoritePokemons.map(({ id }) => id))
			.then(({ pokemons }) => setSmallPokemons(pokemons))
			.catch((error: Error) => console.error(error));
	}, [favoritePokemons, pokemonListRepository]);

	return (
		<>
			{favoritePokemons.length === 0 ? (
				<NoFavorites />
			) : (
				<PokemonCardList pokemons={smallPokemons} />
			)}
		</>
	);
};
