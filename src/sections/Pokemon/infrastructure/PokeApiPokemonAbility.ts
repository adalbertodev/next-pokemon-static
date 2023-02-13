import { Effect, Name, NamedApiResource, VerboseEffect } from "./PokeApiCommon";

export interface EffectChange {
	effect_entries: Effect[];
	version_group: NamedApiResource;
}

interface FlavorText {
	flavor_text: string;
	language: NamedApiResource;
	version_group: NamedApiResource;
}

interface AbilityPokemon {
	is_hidden: boolean;
	slot: number;
	pokemon: NamedApiResource;
}

export interface PokeApiPokemonAbility {
	id: number;
	name: string;
	effect_changes: EffectChange[];
	effect_entries: VerboseEffect[];
	flavor_text_entries: FlavorText[];
	generation: NamedApiResource;
	is_main_series: boolean;
	names: Name[];
	pokemon: AbilityPokemon[];
}
