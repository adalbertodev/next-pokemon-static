/* eslint-disable camelcase */
import { config } from "@/config";
import { appFetch } from "@/utils";

import {
	Pokemon,
	PokemonAbility,
	PokemonEvolution,
	PokemonMove,
	PokemonRepository,
	PokemonStat,
} from "../domain";
import {
	PokeApiAbility,
	PokeApiMove,
	PokeApiPokemon,
	PokeApiSpecies,
	PokeApiStat,
} from "./PokeApi";
import { PokeApiEvolutionRepository } from "./PokeApiEvolutionRepository";
import { PokeApiMoveRepository } from "./PokeApiMoveRepository";
import { PokeApiTypeRepository } from "./PokeApiTypeRepository";
import { translateName } from "./utils";

export class PokeApiPokemonRepository implements PokemonRepository {
	private readonly pokemonEndpoint = "https://pokeapi.co/api/v2/pokemon/$id";
	private readonly language = "es";

	private readonly methods = config.pokemonMoves.methods;
	private readonly versions = config.pokemonMoves.versions;

	public searchById = async (id: number): Promise<Pokemon | null> => {
		const url = this.pokemonEndpoint.replace("$id", id.toString());

		const pokeApiPokemon = await appFetch<PokeApiPokemon>(url, true);

		if (pokeApiPokemon === null) {
			return null;
		}

		return await this.pokeApiToApp(pokeApiPokemon);
	};

	public searchByName = async (name: string): Promise<Pokemon | null> => {
		const url = this.pokemonEndpoint.replace("$id", name);

		const pokeApiPokemon = await appFetch<PokeApiPokemon>(url, true);

		if (pokeApiPokemon === null) {
			return null;
		}

		return await this.pokeApiToApp(pokeApiPokemon);
	};

	private readonly pokeApiToApp = async (pokeApiPokemon: PokeApiPokemon): Promise<Pokemon> => {
		const pokeTypeRepository = new PokeApiTypeRepository();

		const { id, name, weight, height, types, sprites, abilities, moves, stats, species } =
			pokeApiPokemon;

		return {
			id,
			name,
			weight: weight / 10, // api return in hectometers
			height: height / 10, // api return in decimeters

			abilities: await this.convertToAppAbilities(abilities),
			type: await pokeTypeRepository.searchPokemonTypeByUrls(types.map(({ type }) => type.url)),
			evolution: await this.convertToAppEvolution(species.url),

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

	private readonly convertToAppEvolution = async (
		speciesUrl: string
	): Promise<PokemonEvolution> => {
		const pokemonEvolutionRepository = new PokeApiEvolutionRepository();

		const pokeApiSpecies = await appFetch<PokeApiSpecies>(speciesUrl);

		const pokemonEvolution = await pokemonEvolutionRepository.searchByUrl(
			pokeApiSpecies.evolution_chain.url
		);

		return pokemonEvolution;
	};

	private readonly getAppMoves = async (moves: PokeApiMove[]): Promise<PokemonMove[]> => {
		const moveRepository = new PokeApiMoveRepository();

		const filterByMethods = (moves: PokeApiMove[]): PokeApiMove[] => {
			return moves
				.map((move) => ({
					...move,
					version_group_details: move.version_group_details.filter(({ move_learn_method }) =>
						this.methods.find((method) => method.key === move_learn_method.name)
					),
				}))
				.filter((move) => move.version_group_details.length > 0);
		};

		const filterByLastVersion = (moves: PokeApiMove[]): PokeApiMove[] => {
			const lastVersionToAppear = this.versions.find((version) =>
				moves.find((move) =>
					move.version_group_details.find(({ version_group }) => version_group.name === version)
				)
			);

			return moves
				.map((move) => ({
					...move,
					version_group_details: move.version_group_details.filter(
						({ version_group }) => version_group.name === lastVersionToAppear
					),
				}))
				.filter((move) => move.version_group_details.length > 0);
		};

		const pokemonMoves = filterByLastVersion(filterByMethods(moves)).map(
			async ({ move, version_group_details }) => {
				const details = version_group_details[0];

				const learnedMethod =
					this.methods.find((method) => method.key === details.move_learn_method.name)?.label ??
					"—";

				return {
					...(await moveRepository.searchByUrl(move.url)),
					learnedMethod:
						learnedMethod === "Nv."
							? `${learnedMethod} ${details.level_learned_at}`
							: learnedMethod,
				};
			}
		);

		return await Promise.all(pokemonMoves);
	};

	private readonly convertToAppStats = async (stats: PokeApiStat[]): Promise<PokemonStat[]> => {
		const pokemonStats = stats.map(async ({ stat, base_stat }) => ({
			base: base_stat,
			name: (await translateName(stat.url, this.language)) ?? stat.name,
		}));

		return await Promise.all(pokemonStats);
	};
}
