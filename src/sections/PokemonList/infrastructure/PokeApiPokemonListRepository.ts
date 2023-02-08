import { PokeApiPokemon } from "@/sections/Pokemon";

import { PokemonItem, PokemonList, PokemonListRepository } from "../domain";
import { PokeApiPokemonList } from "./PokeApiPokemonList";

export class PokeApiPokemonListRepository implements PokemonListRepository {
	private readonly pokemonListEndpoint = "https://pokeapi.co/api/v2/pokemon?limit=$limit";

	public searchWithLimitBy = async (limit = 151): Promise<PokemonList> => {
		const url = this.pokemonListEndpoint.replace("$limit", limit.toString());

		const pokeApiPokemonList = (await (await fetch(url)).json()) as PokeApiPokemonList;

		const pokemons: PokemonItem[] = await Promise.all(
			pokeApiPokemonList.results.map(async (result) => {
				return fetch(result.url)
					.then<PokeApiPokemon>((response) => response.json())
					.then((response) => ({
						name: result.name,
						id: response.id,
						img:
							response.sprites.other?.dream_world.front_default ??
							response.sprites.versions["generation-viii"].icons.front_default ??
							response.sprites.versions["generation-vii"].icons.front_default ??
							response.sprites.versions["generation-vi"]["omegaruby-alphasapphire"].front_default ??
							response.sprites.versions["generation-v"]["black-white"].front_default ??
							response.sprites.versions["generation-iv"].platinum.front_default ??
							response.sprites.versions["generation-iii"].emerald.front_default ??
							response.sprites.versions["generation-ii"].crystal.front_default ??
							response.sprites.versions["generation-i"].yellow.front_default ??
							"",
					}));
			})
		);

		return {
			pokemons,
		};
	};
}
