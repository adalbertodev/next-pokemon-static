import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";

import { PokemonCardList } from "@/components/pokemon";
import { Layout } from "@/components/ui/templates";
import { config } from "@/config";
import { repositoriesInitialState } from "@/context/RepositoriesContext";
import { SmallPokemon } from "@/sections/PokemonList";

interface Props {
	pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
	return (
		<Layout title={`${config.pageName}, Pokédex Informativa`}>
			<PokemonCardList pokemons={pokemons} />
		</Layout>
	);
};

export const getStaticProps: GetStaticProps<Props> = async (_: GetStaticPropsContext) => {
	const { pokemonListRepository } = repositoriesInitialState;
	const pokemonList = await pokemonListRepository.searchLimitedBy(151);

	return {
		props: {
			pokemons: pokemonList.pokemons,
		},
	};
};

export default HomePage;
