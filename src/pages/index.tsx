import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";

import { PokemonCardList } from "@/components/pokemon";
import { Layout } from "@/components/ui/templates";
import {
	PokeApiPokemonListRepository,
	PokemonListRepository,
	SmallPokemon,
} from "@/sections/PokemonList";

const pokemonListRepository: PokemonListRepository = new PokeApiPokemonListRepository();

interface Props {
	pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
	return (
		<Layout title="Pokédex">
			<PokemonCardList pokemons={pokemons} />
		</Layout>
	);
};

export const getStaticProps: GetStaticProps<Props> = async (_: GetStaticPropsContext) => {
	const pokemonList = await pokemonListRepository.searchLimitedBy(151);

	return {
		props: {
			pokemons: pokemonList.pokemons,
		},
	};
};

export default HomePage;
