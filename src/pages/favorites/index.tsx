import { NextPage } from "next";

import { PokemonFavoriteList } from "@/components/pokemon";
import { Layout } from "@/components/ui";
import {
	LocalStoragePokemonFavoriteRepository,
	PokemonFavoriteRepository,
} from "@/sections/PokemonFavorite";
import { PokeApiPokemonListRepository, PokemonListRepository } from "@/sections/PokemonList";

const pokemonListRepository: PokemonListRepository = new PokeApiPokemonListRepository();
const pokemonFavoriteRepository: PokemonFavoriteRepository =
	new LocalStoragePokemonFavoriteRepository();

const FavoritesPage: NextPage = () => {
	return (
		<Layout title="Favorites | Pokédex">
			<PokemonFavoriteList
				pokemonListRepository={pokemonListRepository}
				pokemonFavoriteRepository={pokemonFavoriteRepository}
			/>
		</Layout>
	);
};

export default FavoritesPage;
