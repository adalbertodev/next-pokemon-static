import {
	GetStaticPaths,
	GetStaticPathsContext,
	GetStaticProps,
	GetStaticPropsContext,
	NextPage,
} from "next";
import { ParsedUrlQuery } from "querystring";

import { Layout } from "@/components/ui/templates";
import { PokeApiPokemonRepository, Pokemon } from "@/sections/Pokemon";

interface Props {
	pokemon: Pokemon;
}

export const PokemonPage: NextPage<Props> = ({ pokemon }) => {
	return (
		<Layout title="Bulbasaur | Pokédex">
			<h1>
				#{pokemon.id} - {pokemon.name}
			</h1>
		</Layout>
	);
};

export const getStaticPaths: GetStaticPaths = (_: GetStaticPathsContext) => {
	const defaultPokemonIds = Array.from({ length: 151 }, (_, index) => `${index + 1}`);

	return {
		paths: defaultPokemonIds.map((pokemonId) => ({
			params: { id: pokemonId },
		})),
		fallback: false,
	};
};

interface Params extends ParsedUrlQuery {
	id: string;
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
	params,
}: GetStaticPropsContext<Params>) => {
	if (!params?.id) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	const { id } = params;

	const pokemon = await new PokeApiPokemonRepository().searchById(Number(id));

	return {
		props: { pokemon },
	};
};

export default PokemonPage;
