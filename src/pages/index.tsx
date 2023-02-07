import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";

import { PokemonCardList } from "@/components/pokemon";
import { Layout } from "@/components/ui/templates";
import { PokeApiPokemonListRepository, PokemonItem } from "@/sections/PokemonList";

interface Props {
	pokemons: PokemonItem[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
	return (
		<Layout title="Pokedex">
			<PokemonCardList pokemons={pokemons} />
		</Layout>
	);
};

export const getStaticProps: GetStaticProps<Props> = async (_: GetStaticPropsContext) => {
	const pokemonList = await new PokeApiPokemonListRepository().searchWithLimitBy(151);

	return {
		props: {
			pokemons: pokemonList.pokemons,
		},
	};
};

export default HomePage;
