/* eslint-disable camelcase */
import { SmallPokemon } from "@/sections/PokemonList";
import { appFetch } from "@/utils";

import { PokemonEvolution } from "../domain";
import { PokeApiChainLink, PokeApiEvolution } from "./PokeApi";
import { PokeApiPokemon } from "./PokeApi/PokeApiPokemon";

export class PokeApiEvolutionRepository {
	private readonly pokemonEndpoint = "https://pokeapi.co/api/v2/evolution-chain/$id";
	private readonly language = "es";

	public searchById = async (id: number): Promise<PokemonEvolution> => {
		const url = this.pokemonEndpoint.replace("$id", id.toString());

		const pokeApiType = await appFetch<PokeApiEvolution>(url);

		return await this.pokeApiToApp(pokeApiType);
	};

	public searchByUrl = async (url: string): Promise<PokemonEvolution> => {
		const pokeApiPokemon = await appFetch<PokeApiEvolution>(url);

		return await this.pokeApiToApp(pokeApiPokemon);
	};

	private readonly pokeApiToApp = async (
		pokeApiEvolution: PokeApiEvolution
	): Promise<PokemonEvolution> => {
		const { chain } = pokeApiEvolution;

		const evolves: PokemonEvolution = {
			evolutionChain: [],
		};

		const getEvolve = async (pokemons: PokeApiChainLink[], index = 0): Promise<void> => {
			evolves.evolutionChain[index] = {
				pokemons: [],
			};

			await Promise.all(
				pokemons.map(async (pokemon) => {
					const smallPokemon: SmallPokemon = await this.processSmallPokemon(pokemon.species.name);

					evolves.evolutionChain[index].pokemons.push(smallPokemon);

					if (pokemon.evolves_to.length > 0) {
						await getEvolve(pokemon.evolves_to, index + 1);
					}
				})
			);
		};

		chain.evolves_to.length > 0 && (await getEvolve(chain.evolves_to));

		const pokemonEvolution: PokemonEvolution = {
			evolutionChain: [
				{ pokemons: [await this.processSmallPokemon(chain.species.name)] },
				...evolves.evolutionChain.map((evolutionStep) => {
					evolutionStep.pokemons.sort((pokemonA, pokemonB) =>
						pokemonA.name > pokemonB.name ? 1 : pokemonA.name < pokemonB.name ? -1 : 0
					);

					return evolutionStep;
				}),
			],
		};

		return pokemonEvolution;
	};

	private readonly processSmallPokemon = async (name: string): Promise<SmallPokemon> => {
		const pokemonUrl = "https://pokeapi.co/api/v2/pokemon/$name";

		const pokeApiPokemon = await appFetch<PokeApiPokemon>(pokemonUrl.replace("$name", name));

		return {
			id: pokeApiPokemon.id,
			name: pokeApiPokemon.name,
			img: pokeApiPokemon.sprites.other?.["official-artwork"].front_default ?? "",
		};
	};
}
