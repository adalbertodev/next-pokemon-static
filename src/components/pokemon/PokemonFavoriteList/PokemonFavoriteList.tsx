import { FC, useEffect, useState } from "react";

import { usePokemonFavorite } from "@/hooks";
import { PokemonFavorite, PokemonFavoriteRepository } from "@/sections/PokemonFavorite";
import { PokemonListRepository, SmallPokemon } from "@/sections/PokemonList";

import { NoFavorites } from "../NoFavorites";
import { PokemonCardList } from "../PokemonCardList";

interface Props {
	pokemonListRepository: PokemonListRepository;
	pokemonFavoriteRepository: PokemonFavoriteRepository;
}

export const PokemonFavoriteList: FC<Props> = ({
	pokemonListRepository,
	pokemonFavoriteRepository,
}) => {
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
