import { PokemonList } from "./PokemonList";

export interface PokemonListRepository {
	searchLimitedBy: (limit?: number) => Promise<PokemonList>;
	searchByIds: (ids: number[]) => Promise<PokemonList>;
}
