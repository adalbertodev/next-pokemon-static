import { Pokemon } from "./Pokemon";

export interface PokemonRepository {
	searchById: (id: number) => Promise<Pokemon>;
	searchByName: (name: string) => Promise<Pokemon>;
}
