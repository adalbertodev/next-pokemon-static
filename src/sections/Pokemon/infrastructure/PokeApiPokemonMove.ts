import {
	APIResource,
	MachineVersionDetail,
	Name,
	NamedApiResource,
	VerboseEffect,
} from "./PokeApiCommon";
import { EffectChange } from "./PokeApiPokemonAbility";

export interface PastMoveStatValues {
	accuracy: number | null;
	effect_chance: number | null;
	power: number | null;
	pp: number | null;
	effect_entries: VerboseEffect[];
	type: NamedApiResource | null;
	version_group: NamedApiResource;
}

interface MoveStatChange {
	change: number;
	stat: NamedApiResource;
}

export interface MoveMetaData {
	ailment: NamedApiResource;
	category: NamedApiResource;
	min_hits: number | null;
	max_hits: number | null;
	min_turns: number | null;
	max_turns: number | null;
	drain: number;
	healing: number;
	crit_rate: number;
	ailment_chance: number;
	flinch_chance: number;
	stat_chance: number;
}

export interface MoveFlavorText {
	flavor_text: string;
	language: NamedApiResource;
	version_group: NamedApiResource;
}

export interface ContestComboDetail {
	use_before: NamedApiResource[] | null;
	use_after: NamedApiResource[] | null;
}

export interface ContestComboSets {
	normal: ContestComboDetail;
	super: ContestComboDetail;
}

export interface PokeApiPokemonMove {
	id: number;
	name: string;
	accuracy: number | null;
	effect_chance: number | null;
	pp: number | null;
	priority: -8 | -7 | -6 | -5 | -4 | -3 | -2 | -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
	power: number | null;
	contest_combos: ContestComboSets | null;
	contest_types: NamedApiResource | null;
	contest_effect: APIResource | null;
	damage_class: NamedApiResource | null;
	effect_entries: VerboseEffect[];
	effect_changes: EffectChange[];
	flavor_text_entries: MoveFlavorText[];
	generation: NamedApiResource;
	machines: MachineVersionDetail[];
	meta: MoveMetaData | null;
	names: Name[];
	past_values: PastMoveStatValues[];
	stat_changes: MoveStatChange[];
	super_contest_effect: APIResource | null;
	target: NamedApiResource;
	type: NamedApiResource;
	learned_by_pokemon: NamedApiResource[];
}
