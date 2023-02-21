/* eslint-disable camelcase */
import { appFetch } from "@/utils";

import { DamageClass, DamageClassValues, PokemonMoveBase } from "../domain";
import { PokeApiPokemonMove } from "./PokeApi";
import { isType, translateName } from "./utils";

export class PokeApiMoveRepository {
	private readonly pokemonEndpoint = "https://pokeapi.co/api/v2/move/$id";
	private readonly language = "es";

	public searchById = async (id: number): Promise<PokemonMoveBase> => {
		const url = this.pokemonEndpoint.replace("$id", id.toString());

		const pokeApiType = await appFetch<PokeApiPokemonMove>(url);

		return await this.pokeApiToApp(pokeApiType);
	};

	public searchByUrl = async (url: string): Promise<PokemonMoveBase> => {
		const pokeApiPokemon = await appFetch<PokeApiPokemonMove>(url);

		return await this.pokeApiToApp(pokeApiPokemon);
	};

	private readonly pokeApiToApp = async (
		pokeApiMove: PokeApiPokemonMove
	): Promise<PokemonMoveBase> => {
		const { names, type, damage_class, name, power, accuracy, pp } = pokeApiMove;

		const typeTranslated = await translateName(type.url, this.language);
		const damageClassTranslated =
			damage_class && (await translateName(damage_class.url, this.language));

		const isDamageClass = (damageClass: string): damageClass is DamageClass => {
			return DamageClassValues.includes(damageClass as DamageClass);
		};

		return {
			name: (await translateName(names, this.language)) ?? name,
			type: typeTranslated && isType(typeTranslated) ? typeTranslated : "Normal",
			damageClass:
				damageClassTranslated && isDamageClass(damageClassTranslated)
					? damageClassTranslated
					: null,
			power: power ?? 0,
			accuracy: accuracy ?? 0,
			pp: pp ?? 0,
		};
	};
}
