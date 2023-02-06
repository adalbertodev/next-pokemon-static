import { GetStaticProps, GetStaticPropsContext, NextPage } from "next";

import { Layout } from "@/components/ui/templates";
import { PokeApiPokemonListRepository, PokemonItem } from "@/sections/PokemonList";

interface Props {
	pokemons: PokemonItem[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
	return (
		<Layout title="Pokedex">
			<ul>
				{pokemons.map(({ id, name }) => (
					<li key={id}>{`#${id} - ${name}`}</li>
				))}
			</ul>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async (_: GetStaticPropsContext) => {
	const pokemonList = await new PokeApiPokemonListRepository().searchWithLimitBy(151);

	return {
		props: {
			pokemons: pokemonList.pokemons,
		},
	};
};

export default HomePage;
