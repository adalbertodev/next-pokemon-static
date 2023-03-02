/* eslint-disable camelcase */
import { appFetch } from "@/utils";

import {
	PokemonTypeAndRelations,
	PokemonTypeRelations,
	Type,
	TypeRelation,
	TypeRelations,
} from "../domain";
import { PokeApiNamedResource, PokeApiPokemonType } from "./PokeApi";
import { isType, translateName } from "./utils";

export class PokeApiTypeRepository {
	private readonly pokemonEndpoint = "https://pokeapi.co/api/v2/type/$id";
	private readonly language = "es";

	public searchPokemonTypeByIds = async (ids: number[]): Promise<PokemonTypeAndRelations> => {
		const urls = ids.map((id) => this.pokemonEndpoint.replace("$id", id.toString()));

		const pokeApiTypes = await Promise.all(
			urls.map(async (url) => await appFetch<PokeApiPokemonType>(url))
		);

		return await this.toApp(pokeApiTypes);
	};

	public searchPokemonTypeByUrls = async (urls: string[]): Promise<PokemonTypeAndRelations> => {
		const pokeApiTypes = await Promise.all(
			urls.map(async (url) => await appFetch<PokeApiPokemonType>(url))
		);

		return await this.toApp(pokeApiTypes);
	};

	public searchTypeRelationsById = async (id: string): Promise<PokemonTypeRelations> => {
		const url = this.pokemonEndpoint.replace("$id", id.toString());

		const pokeApiPokemon = await appFetch<PokeApiPokemonType>(url);

		return await this.toPokemonTypeRelations(pokeApiPokemon);
	};

	public searchTypeRelationsByUrl = async (url: string): Promise<PokemonTypeRelations> => {
		const pokeApiPokemon = await appFetch<PokeApiPokemonType>(url);

		return await this.toPokemonTypeRelations(pokeApiPokemon);
	};

	private readonly toApp = async (
		pokeApiTypes: PokeApiPokemonType[]
	): Promise<PokemonTypeAndRelations> => {
		const pokemonTypes = await Promise.all(
			pokeApiTypes.map(async (pokeApiType) => this.toPokemonTypeRelations(pokeApiType))
		);

		const damageRelations: TypeRelations = pokemonTypes
			.map(({ damageRelations }) => ({
				asDefender: damageRelations.asDefender,
				asAttacker: damageRelations.asDefender,
			}))
			.reduce((result, current) => ({
				asDefender: [...result.asDefender, ...current.asDefender],
				asAttacker: [...result.asAttacker, ...current.asAttacker],
			}));

		damageRelations.asDefender = damageRelations.asDefender
			.map((type, index, types) => {
				const duplicatedTypeValue = types
					.slice(index + 1)
					.find((type2) => type2.name === type.name)?.multiplier;

				return {
					...type,
					multiplier: duplicatedTypeValue ? type.multiplier * duplicatedTypeValue : type.multiplier,
				};
			})
			.filter(
				(type, index, types) => index === types.findIndex((type2) => type2.name === type.name)
			);

		damageRelations.asAttacker = damageRelations.asAttacker.filter(
			(type, index, types) =>
				index === types.findIndex((type2) => JSON.stringify(type2) === JSON.stringify(type))
		);

		return {
			types: pokemonTypes.map((type) => ({ name: type.name })),
			relations: {
				asDefender: damageRelations.asDefender,
				asAttacker: damageRelations.asAttacker,
			},
		};
	};

	private readonly toPokemonTypeRelations = async (
		pokeApiType: PokeApiPokemonType
	): Promise<PokemonTypeRelations> => {
		const { names, damage_relations } = pokeApiType;

		const translatedName = await translateName(names, this.language);

		const toTypeRelation = (types: Type[], multiplier: number): TypeRelation[] => {
			return types.map((type) => ({
				name: type,
				multiplier,
			}));
		};

		return {
			name: translatedName && isType(translatedName) ? translatedName : "Normal",
			damageRelations: {
				asDefender: [
					...toTypeRelation(await this.translateTypes(damage_relations.no_damage_from), 0),
					...toTypeRelation(await this.translateTypes(damage_relations.half_damage_from), 0.5),
					...toTypeRelation(await this.translateTypes(damage_relations.double_damage_from), 2),
				],
				asAttacker: [
					...toTypeRelation(await this.translateTypes(damage_relations.no_damage_to), 0),
					...toTypeRelation(await this.translateTypes(damage_relations.half_damage_to), 0.5),
					...toTypeRelation(await this.translateTypes(damage_relations.double_damage_to), 2),
				],
			},
		};
	};

	private readonly translateTypes = async (resources: PokeApiNamedResource[]): Promise<Type[]> => {
		const translatedTypes = await Promise.all(
			resources.map(async ({ url }) => await translateName(url, this.language))
		);

		return translatedTypes.filter((type): type is Type => !!type && isType(type));
	};
}
