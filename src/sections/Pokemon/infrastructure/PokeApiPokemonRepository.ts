import { Pokemon, PokemonRepository } from "../domain";
import { PokeApiPokemon } from "./PokeApiPokemon";

export class PokeApiPokemonRepository implements PokemonRepository {
	private readonly pokemonEndpoint = "https://pokeapi.co/api/v2/pokemon/$id";

	public searchById = async (id: number): Promise<Pokemon> => {
		const url = this.pokemonEndpoint.replace("$id", id.toString());

		const pokeApiPokemon = (await (await fetch(url)).json()) as PokeApiPokemon;

		return this.pokeApiToApp(pokeApiPokemon);
	};

	searchByName = async (name: string): Promise<Pokemon> => {
		const url = this.pokemonEndpoint.replace("$id", name);

		const pokeApiPokemon = (await (await fetch(url)).json()) as PokeApiPokemon;

		return this.pokeApiToApp(pokeApiPokemon);
	};

	private readonly pokeApiToApp = (pokeApiPokemon: PokeApiPokemon): Pokemon => {
		return {
			abilities: pokeApiPokemon.abilities.map((ability) => ({
				name: ability.ability.name,
				is_hidden: ability.is_hidden,
			})),
			base_experience: pokeApiPokemon.base_experience,
			height: pokeApiPokemon.height,
			held_items: pokeApiPokemon.held_items.map((heldItem) => heldItem.item.name),
			id: pokeApiPokemon.id,
			location_area_encounters: pokeApiPokemon.location_area_encounters,
			moves: pokeApiPokemon.moves.map((move) => ({
				name: move.move.name,
				details: move.version_group_details.map((details) => ({
					level_learned_at: details.level_learned_at,
					move_learn_method: details.move_learn_method.name,
					version: details.version_group.name,
				})),
			})),
			name: pokeApiPokemon.name,
			sprites: {
				default: pokeApiPokemon.sprites.other?.dream_world.front_default ?? null,
				versions: pokeApiPokemon.sprites.versions,
			},
			stats: pokeApiPokemon.stats.map((stat) => ({
				base: stat.base_stat,
				effort: stat.effort,
				name: stat.stat.name,
			})),
			types: pokeApiPokemon.types.map((type) => type.type.name),
			weight: pokeApiPokemon.weight,
		};
	};
}
