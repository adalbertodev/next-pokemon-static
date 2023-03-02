import { Pokemon } from "./Pokemon";

export interface PokemonRepository {
	searchById: (id: number) => Promise<Pokemon | null>;
	searchByName: (name: string) => Promise<Pokemon | null>;
}
