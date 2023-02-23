/* eslint-disable camelcase */
import { appFetch } from "@/utils";

import {
	Pokemon,
	PokemonAbility,
	PokemonMove,
	PokemonRepository,
	PokemonStat,
	PokemonTypeAndRelations,
	Type,
	TypeRelations,
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

			abilities: await this.convertToAppAbilities(abilities),
			type: await this.convertToAppTypes(types),

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

	private readonly convertToAppTypes = async (
		types: PokeApiType[]
	): Promise<PokemonTypeAndRelations> => {
		interface TypeMultiplier {
			name: Type;
			value: number;
		}

		interface DamageRelations {
			damageReceived: TypeMultiplier[];
			damageDone: TypeMultiplier[];
		}

		const typeRepository = new PokeApiTypeRepository();
		const pokemonTypes = await Promise.all(
			types.map(async ({ type }) => typeRepository.searchByUrl(type.url))
		);

		const convertToTypeRelations = (types: TypeMultiplier[], multiplier: number) => {
			return types
				.filter((type) => type.value === multiplier)
				.map((type) => type.name)
				.sort();
		};

		const damageRelations: DamageRelations = pokemonTypes
			.map(({ damageRelations }) => ({
				damageReceived: [
					...damageRelations.noDamageFrom.map((type) => ({ name: type, value: 0 })),
					...damageRelations.halfDamageFrom.map((type) => ({ name: type, value: 0.5 })),
					...damageRelations.doubleDamageFrom.map((type) => ({ name: type, value: 2 })),
				],
				damageDone: [
					...damageRelations.noDamageTo.map((type) => ({ name: type, value: 0 })),
					...damageRelations.halfDamageTo.map((type) => ({ name: type, value: 0.5 })),
					...damageRelations.doubleDamageTo.map((type) => ({ name: type, value: 2 })),
				],
			}))
			.reduce((result, current) => ({
				damageReceived: [...result.damageReceived, ...current.damageReceived],
				damageDone: [...result.damageDone, ...current.damageDone],
			}));

		damageRelations.damageReceived = damageRelations.damageReceived
			.map((type, index, types) => {
				const duplicatedTypeValue = types
					.slice(index + 1)
					.find((type2) => type2.name === type.name)?.value;

				return {
					...type,
					value: duplicatedTypeValue ? type.value * duplicatedTypeValue : type.value,
				};
			})
			.filter(
				(type, index, types) => index === types.findIndex((type2) => type2.name === type.name)
			);

		damageRelations.damageDone = damageRelations.damageDone.filter(
			(type, index, types) =>
				index === types.findIndex((type2) => JSON.stringify(type2) === JSON.stringify(type))
		);

		const pokemonRelations: TypeRelations = {
			noDamageFrom: convertToTypeRelations(damageRelations.damageReceived, 0),
			quarterDamageFrom: convertToTypeRelations(damageRelations.damageReceived, 0.25),
			halfDamageFrom: convertToTypeRelations(damageRelations.damageReceived, 0.5),
			doubleDamageFrom: convertToTypeRelations(damageRelations.damageReceived, 2),
			quadDamageFrom: convertToTypeRelations(damageRelations.damageReceived, 4),
			noDamageTo: convertToTypeRelations(damageRelations.damageDone, 0),
			halfDamageTo: convertToTypeRelations(damageRelations.damageDone, 0.5),
			doubleDamageTo: convertToTypeRelations(damageRelations.damageDone, 2),
		};

		return {
			types: pokemonTypes.map((type) => ({ name: type.name })),
			relations: pokemonRelations,
		};
	};

	private readonly getAppMoves = async (moves: PokeApiMove[]): Promise<PokemonMove[]> => {
		const moveRepository = new PokeApiMoveRepository();
		const methods = [
			{
				key: "level-up",
				label: "Nv.",
			},
			{
				key: "machine",
				label: "MT",
			},
			{
				key: "tutor",
				label: "Tutor",
			},
			{
				key: "egg",
				label: "Huevo",
			},
		];

		const filterByMethods = (moves: PokeApiMove[]): PokeApiMove[] => {
			return moves
				.map((move) => {
					return {
						...move,
						version_group_details: move.version_group_details.filter(({ move_learn_method }) =>
							methods.find((method) => method.key === move_learn_method.name)
						),
					};
				})
				.filter((move) => move.version_group_details.length > 0);
		};

		const filterByLastVersion = (moves: PokeApiMove[]): PokeApiMove[] => {
			const versions = [
				"scarlet-violet",
				"brilliant-diamond-and-shining-pearl",
				"sword-shield",
				"ultra-sun-ultra-moon",
				"sun-moon",
				"omega-ruby-alpha-sapphire",
			];

			const lastVersionToAppear = versions.find((version) =>
				moves.find((move) =>
					move.version_group_details.find(({ version_group }) => version_group.name === version)
				)
			);

			return moves
				.map((move) => {
					return {
						...move,
						version_group_details: move.version_group_details.filter(
							({ version_group }) => version_group.name === lastVersionToAppear
						),
					};
				})
				.filter((move) => move.version_group_details.length > 0);
		};

		const pokemonMoves = filterByLastVersion(filterByMethods(moves)).map(
			async ({ move, version_group_details }) => {
				const learnedMethod =
					methods.find((method) => method.key === version_group_details[0].move_learn_method.name)
						?.label ?? "—";

				return {
					...(await moveRepository.searchByUrl(move.url)),
					learnedMethod:
						learnedMethod === "Nv."
							? `${learnedMethod} ${version_group_details[0].level_learned_at}`
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
