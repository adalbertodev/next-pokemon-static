import { PokemonList } from "./PokemonList";

export interface PokemonListRepository {
	searchWithLimitBy: (limit?: number) => Promise<PokemonList>;
}
