/* eslint-disable camelcase */
import { appFetch } from "@/utils";

import { PokemonTypeWithRelations, Type } from "../domain";
import { PokeApiNamedResource, PokeApiPokemonType } from "./PokeApi";
import { isType, translateName } from "./utils";

export class PokeApiTypeRepository {
	private readonly pokemonEndpoint = "https://pokeapi.co/api/v2/type/$id";
	private readonly language = "es";

	public searchById = async (id: number): Promise<PokemonTypeWithRelations> => {
		const url = this.pokemonEndpoint.replace("$id", id.toString());

		const pokeApiType = await appFetch<PokeApiPokemonType>(url);

		return await this.pokeApiToApp(pokeApiType);
	};

	public searchByUrl = async (url: string): Promise<PokemonTypeWithRelations> => {
		const pokeApiPokemon = await appFetch<PokeApiPokemonType>(url);

		return await this.pokeApiToApp(pokeApiPokemon);
	};

	private readonly pokeApiToApp = async (
		pokeApiType: PokeApiPokemonType
	): Promise<PokemonTypeWithRelations> => {
		const { names, damage_relations } = pokeApiType;

		const translatedName = await translateName(names, this.language);

		return {
			name: translatedName && isType(translatedName) ? translatedName : "Normal",
			damageRelations: {
				noDamageTo: await this.translateTypes(damage_relations.no_damage_to),
				halfDamageTo: await this.translateTypes(damage_relations.half_damage_to),
				doubleDamageTo: await this.translateTypes(damage_relations.double_damage_to),
				noDamageFrom: await this.translateTypes(damage_relations.no_damage_from),
				quarterDamageFrom: [],
				halfDamageFrom: await this.translateTypes(damage_relations.half_damage_from),
				doubleDamageFrom: await this.translateTypes(damage_relations.double_damage_from),
				quadDamageFrom: [],
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
