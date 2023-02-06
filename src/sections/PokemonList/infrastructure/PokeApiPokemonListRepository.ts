import { PokeApiPokemonRepository } from "@/sections/Pokemon";

import { PokemonItem, PokemonList, PokemonListRepository } from "../domain";
import { PokeApiPokemonList } from "./PokeApiPokemonList";

export class PokeApiPokemonListRepository implements PokemonListRepository {
	private readonly pokemonListEndpoint = "https://pokeapi.co/api/v2/pokemon?limit=$limit";

	public searchWithLimitBy = async (limit = 151): Promise<PokemonList> => {
		const url = this.pokemonListEndpoint.replace("$limit", limit.toString());

		const pokeApiPokemonList = (await (await fetch(url)).json()) as PokeApiPokemonList;

		const pokemons: PokemonItem[] = await Promise.all(
			pokeApiPokemonList.results.map(async (result) => {
				const pokemon = await new PokeApiPokemonRepository().searchByName(result.name);

				return {
					name: result.name,
					url: result.url,
					id: pokemon.id,
					img:
						pokemon.sprites.default ??
						pokemon.sprites.versions["generation-viii"].icons.front_default ??
						pokemon.sprites.versions["generation-vii"].icons.front_default ??
						pokemon.sprites.versions["generation-vi"]["omegaruby-alphasapphire"].front_default ??
						pokemon.sprites.versions["generation-v"]["black-white"].front_default ??
						pokemon.sprites.versions["generation-iv"].platinum.front_default ??
						pokemon.sprites.versions["generation-iii"].emerald.front_default ??
						pokemon.sprites.versions["generation-ii"].crystal.front_default ??
						pokemon.sprites.versions["generation-i"].yellow.front_default ??
						"",
				};
			})
		);

		return {
			pokemons,
		};
	};
}
