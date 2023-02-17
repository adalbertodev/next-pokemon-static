export interface PokeApiNamedResource {
	name: string;
	url: string;
}

export interface PokeApiResource {
	url: string;
}

export interface PokeApiName {
	name: string;
	language: PokeApiNamedResource;
}

export interface PokeApiEffect {
	effect: string;
	language: PokeApiNamedResource;
}

export interface PokeApiVerboseEffect {
	effect: string;
	short_effect: string;
	language: PokeApiNamedResource;
}

export interface PokeApiDescription {
	description: string;
	language: PokeApiNamedResource;
}

export interface PokeApiMachineVersionDetail {
	machine: PokeApiResource;
	version_group: PokeApiNamedResource;
}

export interface PokeApiGenerationGameIndex {
	game_index: number;
	generation: PokeApiNamedResource;
}

export interface PokeApiFlavorText {
	flavor_text: string;
	language: PokeApiNamedResource;
}
