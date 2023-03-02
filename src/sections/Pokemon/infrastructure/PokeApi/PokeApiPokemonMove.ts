import {
	PokeApiMachineVersionDetail,
	PokeApiName,
	PokeApiNamedResource,
	PokeApiResource,
	PokeApiVerboseEffect,
} from "./PokeApiCommon";
import { PokeApiEffectChange } from "./PokeApiPokemonAbility";

interface PastMoveStatValues {
	accuracy: number | null;
	effect_chance: number | null;
	power: number | null;
	pp: number | null;
	effect_entries: PokeApiVerboseEffect[];
	type: PokeApiNamedResource | null;
	version_group: PokeApiNamedResource;
}

interface MoveStatChange {
	change: number;
	stat: PokeApiNamedResource;
}

interface MoveMetaData {
	ailment: PokeApiNamedResource;
	category: PokeApiNamedResource;
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

interface MoveFlavorText {
	flavor_text: string;
	language: PokeApiNamedResource;
	version_group: PokeApiNamedResource;
}

interface ContestComboDetail {
	use_before: PokeApiNamedResource[] | null;
	use_after: PokeApiNamedResource[] | null;
}

interface ContestComboSets {
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
	contest_types: PokeApiNamedResource | null;
	contest_effect: PokeApiResource | null;
	damage_class: PokeApiNamedResource | null;
	effect_entries: PokeApiVerboseEffect[];
	effect_changes: PokeApiEffectChange[];
	flavor_text_entries: MoveFlavorText[];
	generation: PokeApiNamedResource;
	machines: PokeApiMachineVersionDetail[];
	meta: MoveMetaData | null;
	names: PokeApiName[];
	past_values: PastMoveStatValues[];
	stat_changes: MoveStatChange[];
	super_contest_effect: PokeApiResource | null;
	target: PokeApiNamedResource;
	type: PokeApiNamedResource;
	learned_by_pokemon: PokeApiNamedResource[];
}
