import { PokemonFavorite } from "./PokemonFavorite";

export interface PokemonFavoriteRepository {
	search: () => Promise<PokemonFavorite[]>;
	toggle: (pokemonFavorite: PokemonFavorite) => Promise<void>;
}
