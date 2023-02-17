import { PokeApiPokemon } from "@/sections/Pokemon";
import { appFetch } from "@/utils";

import { PokemonList, PokemonListRepository } from "../domain";
import { PokeApiPokemonList } from "./PokeApiPokemonList";

export class PokeApiPokemonListRepository implements PokemonListRepository {
	private readonly pokemonListEndpoint = "https://pokeapi.co/api/v2/pokemon?limit=$limit";

	public searchLimitedBy = async (limit = 151): Promise<PokemonList> => {
		const url = this.pokemonListEndpoint.replace("$limit", limit.toString());

		const pokeApiPokemonList = await appFetch<PokeApiPokemonList>(url);

		return {
			pokemons: await Promise.all(
				pokeApiPokemonList.results.map(async ({ name, url }) => {
					const { id, sprites } = await appFetch<PokeApiPokemon>(url);

					return {
						name,
						id,
						img:
							sprites.other?.dream_world.front_default ??
							sprites.versions["generation-viii"].icons.front_default ??
							sprites.versions["generation-vii"].icons.front_default ??
							sprites.versions["generation-vi"]["omegaruby-alphasapphire"].front_default ??
							sprites.versions["generation-v"]["black-white"].front_default ??
							sprites.versions["generation-iv"].platinum.front_default ??
							sprites.versions["generation-iii"].emerald.front_default ??
							sprites.versions["generation-ii"].crystal.front_default ??
							sprites.versions["generation-i"].yellow.front_default ??
							"",
					};
				})
			),
		};
	};
}
