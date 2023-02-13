/* eslint-disable camelcase */
import {
	DamageClass,
	DamageClassValues,
	Pokemon,
	PokemonAbility,
	PokemonMoveBase,
	PokemonMoves,
	PokemonRepository,
	PokemonType,
	Type,
	TypeValues,
} from "../domain";
import { Name, NamedApiResource } from "./PokeApiCommon";
import { PokeApiAbility, PokeApiMove, PokeApiPokemon, PokeApiType } from "./PokeApiPokemon";
import { PokeApiPokemonMove } from "./PokeApiPokemonMove";
import { PokeApiPokemonType } from "./PokeApiPokemonType";

export class PokeApiPokemonRepository implements PokemonRepository {
	private readonly pokemonEndpoint = "https://pokeapi.co/api/v2/pokemon/$id";
	private readonly language = "es";

	public searchById = async (id: number): Promise<Pokemon> => {
		const url = this.pokemonEndpoint.replace("$id", id.toString());

		const pokeApiPokemon = (await (await fetch(url)).json()) as PokeApiPokemon;

		return await this.pokeApiToApp(pokeApiPokemon);
	};

	searchByName = async (name: string): Promise<Pokemon> => {
		const url = this.pokemonEndpoint.replace("$id", name);

		const pokeApiPokemon = (await (await fetch(url)).json()) as PokeApiPokemon;

		return await this.pokeApiToApp(pokeApiPokemon);
	};

	private readonly pokeApiToApp = async (pokeApiPokemon: PokeApiPokemon): Promise<Pokemon> => {
		return {
			id: pokeApiPokemon.id,
			name: pokeApiPokemon.name,
			weight: pokeApiPokemon.weight / 10, // api return in hectometers
			height: pokeApiPokemon.height / 10, // api return in decimeters

			types: await this.getAppTypes(pokeApiPokemon.types),
			abilities: await this.getAppAbilities(pokeApiPokemon.abilities),

			moves: await this.getAppMoves(pokeApiPokemon.moves),
			stats: pokeApiPokemon.stats.map((stat) => ({
				base: stat.base_stat,
				effort: stat.effort,
				name: stat.stat.name,
			})),
			sprites: {
				default: pokeApiPokemon.sprites.other?.dream_world.front_default ?? null,
				versions: {
					"generation-i": pokeApiPokemon.sprites.versions["generation-i"],
					"generation-ii": pokeApiPokemon.sprites.versions["generation-ii"],
					"generation-iii": pokeApiPokemon.sprites.versions["generation-iii"],
					"generation-iv": pokeApiPokemon.sprites.versions["generation-iv"],
					"generation-v": pokeApiPokemon.sprites.versions["generation-v"],
					"generation-vi": pokeApiPokemon.sprites.versions["generation-vi"],
				},
			},
		};
	};

	private readonly getAppAbilities = async (
		abilities: PokeApiAbility[]
	): Promise<PokemonAbility[]> => {
		return await Promise.all(
			abilities.map(async ({ ability, is_hidden: isHidden }) => {
				const { name, url } = ability;

				return {
					name: (await this.translateToEs(url)) ?? name,
					isHidden,
				};
			})
		);
	};

	private readonly getAppTypes = async (types: PokeApiType[]): Promise<PokemonType[]> => {
		return await Promise.all(
			types.map(async ({ type }) => {
				const { name, url } = type;

				const response = await fetch(url);
				const { names, damage_relations } = (await response.json()) as PokeApiPokemonType;

				const spanishName =
					names.find((name) => name.language.name === this.language)?.name ?? name;

				const convertToTypes = async (resource: NamedApiResource[]): Promise<Type[]> => {
					return (await Promise.all(resource.map(async ({ url }) => await this.translateToEs(url))))
						.map((name) => (this.checkType(name || "") ? name : undefined))
						.filter((type): type is Type => type !== undefined);
				};

				return {
					name: this.checkType(spanishName) ? spanishName : "Normal",
					damageRelations: {
						noDamageTo: await convertToTypes(damage_relations.no_damage_to),
						halfDamageTo: await convertToTypes(damage_relations.half_damage_to),
						doubleDamageTo: await convertToTypes(damage_relations.double_damage_to),
						noDamageFrom: await convertToTypes(damage_relations.no_damage_from),
						halfDamageFrom: await convertToTypes(damage_relations.half_damage_from),
						doubleDamageFrom: await convertToTypes(damage_relations.double_damage_from),
					},
				};
			})
		);
	};

	private readonly getAppMoves = async (moves: PokeApiMove[]): Promise<PokemonMoves> => {
		const filterBy = (moves: PokeApiMove[], method: string): PokeApiMove[] => {
			return moves
				.map((move) => {
					move.version_group_details = move.version_group_details.filter(
						(details) => details.move_learn_method.name === method
					);

					return {
						...move,
					};
				})
				.filter((move) => move.version_group_details.length > 0);
		};

		const getMoveData = async (move: PokeApiMove): Promise<PokemonMoveBase> => {
			const {
				move: { name, url },
			} = move;

			const response = await fetch(url);
			const { names, type, damage_class } = (await response.json()) as PokeApiPokemonMove;

			const typeTranslated = (await this.translateToEs(type.url)) ?? "";

			const damageClassTranslated = damage_class
				? (await this.translateToEs(damage_class.url)) ?? null
				: null;

			const isDamageClass = (damageClass: string | null): damageClass is DamageClass => {
				return DamageClassValues.includes(damageClass as DamageClass);
			};

			return {
				name: names.find((name) => name.language.name === this.language)?.name ?? name,
				type: this.checkType(typeTranslated) ? typeTranslated : "Normal",
				damageClass: isDamageClass(damageClassTranslated) ? damageClassTranslated : null,
			};
		};

		const movesByLevelUp = filterBy(moves, "level-up");
		const movesByEgg = filterBy(moves, "egg");
		const movesByTutor = filterBy(moves, "tutor");
		const movesByMachine = filterBy(moves, "machine");

		const learnedByLevel = await Promise.all(
			movesByLevelUp.map(async (move) => {
				const { version_group_details } = move;

				const moveBase = await getMoveData(move);

				return {
					...moveBase,
					versionDetails: version_group_details.map((details) => ({
						version: details.version_group.name,
						learnedLevel: details.level_learned_at,
					})),
				};
			})
		);

		const learnedByEgg = await Promise.all(
			movesByEgg.map(async (move) => {
				const { version_group_details } = move;

				const moveBase = await getMoveData(move);

				return {
					...moveBase,
					versionDetails: version_group_details.map((details) => ({
						version: details.version_group.name,
					})),
				};
			})
		);

		const learnedByTutor = await Promise.all(
			movesByTutor.map(async (move) => {
				const { version_group_details } = move;

				const moveBase = await getMoveData(move);

				return {
					...moveBase,
					versionDetails: version_group_details.map((details) => ({
						version: details.version_group.name,
					})),
				};
			})
		);

		const learnedByMachine = await Promise.all(
			movesByMachine.map(async (move) => {
				const { version_group_details } = move;

				const moveBase = await getMoveData(move);

				return {
					...moveBase,
					versionDetails: version_group_details.map((details) => ({
						version: details.version_group.name,
					})),
				};
			})
		);

		return {
			learnedByLevel,
			learnedByEgg,
			learnedByTutor,
			learnedByMachine,
		};
	};

	private readonly translateToEs = async (url: string): Promise<string | undefined> => {
		const response = await fetch(url);
		const { names } = (await response.json()) as { names: Name[] };

		return names.find((name) => name.language.name === this.language)?.name;
	};

	private readonly checkType = (type: string): type is Type => {
		return TypeValues.includes(type as Type);
	};
}
