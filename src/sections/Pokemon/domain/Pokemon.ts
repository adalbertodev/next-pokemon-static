import { PokemonMove } from "./PokemonMove";
import { PokemonType, TypeRelations } from "./PokemonType";

export interface PokemonAbility {
	name: string;
	isHidden: boolean;
}

export interface PokemonTypeAndRelations {
	types: PokemonType[];
	relations: TypeRelations;
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

	abilities: PokemonAbility[];
	type: PokemonTypeAndRelations;

	moves: PokemonMove[];
	stats: PokemonStat[];
	sprites: PokemonSprites;
}
