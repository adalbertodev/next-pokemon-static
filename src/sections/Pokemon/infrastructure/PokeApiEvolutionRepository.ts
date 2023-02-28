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

		const evolves: PokeApiChainLink[] = [];

		const getEvolve = (pokemons: PokeApiChainLink[]) => {
			pokemons.forEach((pokemon) => {
				evolves.push(pokemon);
				pokemon.evolves_to.length > 0 && getEvolve(pokemon.evolves_to);
			});
		};

		getEvolve(chain.evolves_to);

		const pokemonEvolution: PokemonEvolution = {
			evolutions: [
				await this.processSmallPokemon(chain.species.name),
				...(await Promise.all(
					evolves.map(async (evolve) => await this.processSmallPokemon(evolve.species.name))
				)),
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
			img: pokeApiPokemon.sprites.other?.dream_world.front_default ?? "",
		};
	};
}
