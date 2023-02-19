import { PokemonMove } from "./PokemonMove";
import { PokemonType } from "./PokemonType";

export interface PokemonAbility {
	name: string;
	isHidden: boolean;
}

export interface PokemonStat {
	name: string;
	base: number;
}

export interface PokemonSprites {
	default: string | null;

	backFemale: string | null;
	backMale: string | null;
	backShinyFemale: string | null;
	backShinyMale: string | null;
	frontFemale: string | null;
	frontMale: string | null;
	frontShinyFemale: string | null;
	frontShinyMale: string | null;
}

export interface Pokemon {
	id: number;
	name: string;
	weight: number;
	height: number;

	types: PokemonType[];
	abilities: PokemonAbility[];

	moves: PokemonMove[];
	stats: PokemonStat[];
	sprites: PokemonSprites;
}
