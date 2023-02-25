import { PokeApiPokemon, PokeApiPokemonSprites } from "@/sections/Pokemon";
import { appFetch } from "@/utils";

import { PokemonList, PokemonListRepository } from "../domain";
import { PokeApiPokemonList } from "./PokeApiPokemonList";

export class PokeApiPokemonListRepository implements PokemonListRepository {
	private readonly limitedEndpoint = "https://pokeapi.co/api/v2/pokemon?limit=$limit";
	private readonly oneEndpoint = "https://pokeapi.co/api/v2/pokemon/$id";

	public searchLimitedBy = async (limit = 151): Promise<PokemonList> => {
		const url = this.limitedEndpoint.replace("$limit", limit.toString());

		const pokeApiPokemonList = await appFetch<PokeApiPokemonList>(url);

		return {
			pokemons: await Promise.all(
				pokeApiPokemonList.results.map(async ({ name, url }) => {
					const { id, sprites } = await appFetch<PokeApiPokemon>(url);

					return {
						name,
						id,
						img: this.getPokemonImage(sprites),
					};
				})
			),
		};
	};

	public searchByIds = async (ids: number[]): Promise<PokemonList> => {
		const urls = ids.map((id) => this.oneEndpoint.replace("$id", id.toString()));

		return {
			pokemons: await Promise.all(
				urls.map(async (url) => {
					const { id, name, sprites } = await appFetch<PokeApiPokemon>(url);

					return {
						name,
						id,
						img: this.getPokemonImage(sprites),
					};
				})
			),
		};
	};

	private readonly getPokemonImage = (sprites: PokeApiPokemonSprites): string => {
		return (
			sprites.other?.dream_world.front_default ??
			sprites.versions["generation-viii"].icons.front_default ??
			sprites.versions["generation-vii"].icons.front_default ??
			sprites.versions["generation-vi"]["omegaruby-alphasapphire"].front_default ??
			sprites.versions["generation-v"]["black-white"].front_default ??
			sprites.versions["generation-iv"].platinum.front_default ??
			sprites.versions["generation-iii"].emerald.front_default ??
			sprites.versions["generation-ii"].crystal.front_default ??
			sprites.versions["generation-i"].yellow.front_default ??
			""
		);
	};
}
