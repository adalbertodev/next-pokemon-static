import {
	PokeApiDescription,
	PokeApiFlavorText,
	PokeApiName,
	PokeApiNamedResource,
	PokeApiResource,
} from "./PokeApiCommon";

export interface PalParkEncounterArea {
	base_score: number;
	rate: number;
	area: PokeApiNamedResource;
}

export interface PokemonSpeciesDexEntry {
	entry_number: number;
	pokedex: PokeApiNamedResource;
}

export interface Genus {
	genus: string;
	language: PokeApiNamedResource;
}

export interface PokemonSpeciesVariety {
	is_default: boolean;
	pokemon: PokeApiNamedResource;
}

export interface PokeApiSpecies {
	id: number;
	name: string;
	order: number;
	gender_rate: number;
	capture_rate: number;
	base_happiness: number;
	is_baby: boolean;
	is_legendary: boolean;
	is_mythical: boolean;
	hatch_counter: number;
	has_gender_differences: boolean;
	forms_switchable: boolean;
	growth_rate: PokeApiNamedResource;
	pokedex_numbers: PokemonSpeciesDexEntry[];
	egg_groups: PokeApiNamedResource[];
	color: PokeApiNamedResource;
	shape: PokeApiNamedResource;
	evolves_from_species: PokeApiNamedResource;
	evolution_chain: PokeApiResource;
	habitat: PokeApiNamedResource;
	generation: PokeApiNamedResource;
	names: PokeApiName[];
	pal_park_encounters: PalParkEncounterArea[];
	flavor_text_entries: PokeApiFlavorText[];
	form_descriptions: PokeApiDescription[];
	genera: Genus[];
	varieties: PokemonSpeciesVariety[];
}
