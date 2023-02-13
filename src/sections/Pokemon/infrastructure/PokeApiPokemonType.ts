import { GenerationGameIndex, Name, NamedApiResource } from "./PokeApiCommon";

export interface TypePokemon {
	slot: number;
	pokemon: NamedApiResource;
}

export interface TypeRelations {
	no_damage_to: NamedApiResource[];
	half_damage_to: NamedApiResource[];
	double_damage_to: NamedApiResource[];
	no_damage_from: NamedApiResource[];
	half_damage_from: NamedApiResource[];
	double_damage_from: NamedApiResource[];
}

export interface PokeApiPokemonType {
	id: number;
	name: string;
	damage_relations: TypeRelations;
	game_indices: GenerationGameIndex[];
	generation: NamedApiResource;
	move_damage_class: NamedApiResource;
	names: Name[];
	pokemon: TypePokemon[];
	moves: NamedApiResource[];
}
