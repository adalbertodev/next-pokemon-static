import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

import { PokemonInfo } from "@/components/pokemon";
import { Layout } from "@/components/ui/templates";
import { config } from "@/config";
import { PokeApiPokemonRepository, Pokemon, PokemonRepository } from "@/sections/Pokemon";
import { capitalize } from "@/utils";

const pokemonRepository: PokemonRepository = new PokeApiPokemonRepository();

interface Props {
	pokemon: Pokemon;
}

export const PokemonPage: NextPage<Props> = ({ pokemon }) => {
	return (
		<Layout title={`${capitalize(pokemon.name)} | ${config.pageName} Pokédex Informativa`}>
			<PokemonInfo pokemon={pokemon} />
		</Layout>
	);
};

interface Params extends ParsedUrlQuery {
	id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = () => {
	const defaultPokemonIds = Array.from({ length: 151 }, (_, index) => `${index + 1}`);

	return {
		paths: defaultPokemonIds.map((pokemonId) => ({
			params: { id: pokemonId },
		})),
		fallback: false,
	};
};

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
	const pokemon = await pokemonRepository.searchById(Number(id));

	return {
		props: { pokemon },
	};
};

export default PokemonPage;
