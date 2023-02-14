import { PokeApiGenerationGameIndex, PokeApiName, PokeApiNamedResource } from "./PokeApiCommon";

interface TypePokemon {
	slot: number;
	pokemon: PokeApiNamedResource;
}

interface TypeRelations {
	no_damage_to: PokeApiNamedResource[];
	half_damage_to: PokeApiNamedResource[];
	double_damage_to: PokeApiNamedResource[];
	no_damage_from: PokeApiNamedResource[];
	half_damage_from: PokeApiNamedResource[];
	double_damage_from: PokeApiNamedResource[];
}

export interface PokeApiPokemonType {
	id: number;
	name: string;
	damage_relations: TypeRelations;
	game_indices: PokeApiGenerationGameIndex[];
	generation: PokeApiNamedResource;
	move_damage_class: PokeApiNamedResource;
	names: PokeApiName[];
	pokemon: TypePokemon[];
	moves: PokeApiNamedResource[];
}
