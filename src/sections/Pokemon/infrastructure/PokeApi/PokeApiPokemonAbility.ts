import {
	PokeApiEffect,
	PokeApiName,
	PokeApiNamedResource,
	PokeApiVerboseEffect,
} from "./PokeApiCommon";

export interface PokeApiEffectChange {
	effect_entries: PokeApiEffect[];
	version_group: PokeApiNamedResource;
}

interface FlavorText {
	flavor_text: string;
	language: PokeApiNamedResource;
	version_group: PokeApiNamedResource;
}

interface AbilityPokemon {
	is_hidden: boolean;
	slot: number;
	pokemon: PokeApiNamedResource;
}

export interface PokeApiPokemonAbility {
	id: number;
	name: string;
	effect_changes: PokeApiEffectChange[];
	effect_entries: PokeApiVerboseEffect[];
	flavor_text_entries: FlavorText[];
	generation: PokeApiNamedResource;
	is_main_series: boolean;
	names: PokeApiName[];
	pokemon: AbilityPokemon[];
}
