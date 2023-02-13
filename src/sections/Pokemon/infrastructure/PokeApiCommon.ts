export interface NamedApiResource {
	name: string;
	url: string;
}

export interface APIResource {
	url: string;
}

export interface Name {
	name: string;
	language: NamedApiResource;
}

export interface Effect {
	effect: string;
	language: NamedApiResource;
}

export interface VerboseEffect {
	effect: string;
	short_effect: string;
	language: NamedApiResource;
}

export interface Description {
	description: string;
	language: NamedApiResource;
}

export interface MachineVersionDetail {
	machine: APIResource;
	version_group: NamedApiResource;
}

export interface GenerationGameIndex {
	game_index: number;
	generation: NamedApiResource;
}
