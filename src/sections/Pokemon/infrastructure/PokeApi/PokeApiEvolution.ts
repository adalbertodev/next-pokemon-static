import { PokeApiNamedResource } from "./PokeApiCommon";

interface EvolutionDetail {
	item: PokeApiNamedResource | null;
	trigger: PokeApiNamedResource;
	gender: number | null;
	held_item: PokeApiNamedResource | null;
	known_move: PokeApiNamedResource | null;
	known_move_type: PokeApiNamedResource | null;
	location: PokeApiNamedResource | null;
	min_level: number | null;
	min_happiness: number | null;
	min_beauty: number | null;
	min_affection: number | null;
	needs_overworld_rain: boolean;
	party_species: PokeApiNamedResource | null;
	party_type: PokeApiNamedResource | null;
	relative_physical_stats: 1 | 0 | -1 | null;
	time_of_day: "Day" | "Night" | "";
	trade_species: PokeApiNamedResource | null;
	turn_upside_down: boolean;
}

export interface PokeApiChainLink {
	is_baby: boolean;
	species: PokeApiNamedResource;
	evolution_details: EvolutionDetail[];
	evolves_to: PokeApiChainLink[];
}

export interface PokeApiEvolution {
	id: number;
	baby_trigger_item: PokeApiNamedResource | null;
	chain: PokeApiChainLink;
}
