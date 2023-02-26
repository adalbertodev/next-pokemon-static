import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";

import { PokemonInfo } from "@/components/pokemon";
import { Layout } from "@/components/ui/templates";
import { config } from "@/config";
import { repositoriesInitialState } from "@/context/RepositoriesContext";
import { Pokemon } from "@/sections/Pokemon";
import { capitalize } from "@/utils";

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
	name: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
	const { pokemonListRepository } = repositoriesInitialState;
	const pokemonList = await pokemonListRepository.searchLimitedBy(151);

	return {
		paths: pokemonList.pokemons.map(({ name }) => ({
			params: { name },
		})),
		fallback: "blocking",
	};
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
	params,
}: GetStaticPropsContext<Params>) => {
	if (!params?.name) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	const { pokemonRepository } = repositoriesInitialState;
	const { name } = params;

	const nameIsNumber = !Number.isNaN(Number(name));

	const pokemon = nameIsNumber
		? await pokemonRepository.searchById(Number(name))
		: await pokemonRepository.searchByName(name);

	if (!pokemon) {
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}

	if (nameIsNumber) {
		return {
			redirect: {
				destination: `/pokemon/${pokemon.name}`,
				permanent: false,
			},
		};
	}

	return {
		props: {
			pokemon,
		},
		revalidate: 86400,
	};
};

export default PokemonPage;
