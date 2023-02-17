/* eslint-disable camelcase */
import { appFetch } from "@/utils";

import {
	Pokemon,
	PokemonAbility,
	PokemonMoves,
	PokemonRepository,
	PokemonStat,
	PokemonType,
} from "../domain";
import { PokeApiAbility, PokeApiMove, PokeApiPokemon, PokeApiStat, PokeApiType } from "./PokeApi";
import { PokeApiMoveRepository } from "./PokeApiMoveRepository";
import { PokeApiTypeRepository } from "./PokeApiTypeRepository";
import { translateName } from "./utils";

export class PokeApiPokemonRepository implements PokemonRepository {
	private readonly pokemonEndpoint = "https://pokeapi.co/api/v2/pokemon/$id";
	private readonly language = "es";

	public searchById = async (id: number): Promise<Pokemon> => {
		const url = this.pokemonEndpoint.replace("$id", id.toString());

		const pokeApiPokemon = await appFetch<PokeApiPokemon>(url);

		return await this.pokeApiToApp(pokeApiPokemon);
	};

	public searchByName = async (name: string): Promise<Pokemon> => {
		const url = this.pokemonEndpoint.replace("$id", name);

		const pokeApiPokemon = await appFetch<PokeApiPokemon>(url);

		return await this.pokeApiToApp(pokeApiPokemon);
	};

	private readonly pokeApiToApp = async (pokeApiPokemon: PokeApiPokemon): Promise<Pokemon> => {
		const { id, name, weight, height, types, sprites, abilities, moves, stats } = pokeApiPokemon;

		return {
			id,
			name,
			weight: weight / 10, // api return in hectometers
			height: height / 10, // api return in decimeters

			types: await this.convertToAppTypes(types),
			abilities: await this.convertToAppAbilities(abilities),

			moves: await this.getAppMoves(moves),
			stats: await this.convertToAppStats(stats),
			sprites: {
				default: sprites.other?.dream_world.front_default ?? null,
				backFemale: sprites.back_female,
				backMale: sprites.back_default,
				backShinyFemale: sprites.back_shiny_female,
				backShinyMale: sprites.back_shiny,
				frontFemale: sprites.front_female,
				frontMale: sprites.front_default,
				frontShinyFemale: sprites.front_shiny_female,
				frontShinyMale: sprites.front_shiny,
			},
		};
	};

	private readonly convertToAppAbilities = async (
		abilities: PokeApiAbility[]
	): Promise<PokemonAbility[]> => {
		const pokemonAbilities = abilities.map(async ({ ability, is_hidden }) => {
			return {
				name: (await translateName(ability.url, this.language)) ?? ability.name,
				isHidden: is_hidden,
			};
		});

		return await Promise.all(pokemonAbilities);
	};

	private readonly convertToAppTypes = async (types: PokeApiType[]): Promise<PokemonType[]> => {
		const typeRepository = new PokeApiTypeRepository();

		return Promise.all(types.map(async ({ type }) => typeRepository.searchByUrl(type.url)));
	};

	private readonly getAppMoves = async (moves: PokeApiMove[]): Promise<PokemonMoves> => {
		const moveRepository = new PokeApiMoveRepository();

		const filterBy = (moves: PokeApiMove[], method: string): PokeApiMove[] => {
			return moves
				.map((move) => ({
					...move,
					version_group_details: move.version_group_details.filter(
						({ move_learn_method }) => move_learn_method.name === method
					),
				}))
				.filter((move) => move.version_group_details.length > 0);
		};

		const learnByLevel = filterBy(moves, "level-up").map(
			async ({ move, version_group_details }) => ({
				...(await moveRepository.searchByUrl(move.url)),
				versionDetails: version_group_details.map((details) => ({
					version: details.version_group.name,
					learnedLevel: details.level_learned_at,
				})),
			})
		);

		return {
			learnByLevel: await Promise.all(learnByLevel),
		};
	};

	private readonly convertToAppStats = async (stats: PokeApiStat[]): Promise<PokemonStat[]> => {
		const pokemonStats = stats.map(async ({ stat, base_stat, effort }) => ({
			base: base_stat,
			effort,
			name: (await translateName(stat.url, this.language)) ?? stat.name,
		}));

		return await Promise.all(pokemonStats);
	};
}
