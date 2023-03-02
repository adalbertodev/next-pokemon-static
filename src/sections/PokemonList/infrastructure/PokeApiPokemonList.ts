export interface PokeApiPokemonItem {
	name: string;
	url: string;
}

export interface PokeApiPokemonList {
	count: number;
	next: string | null;
	previous: string | null;
	results: PokeApiPokemonItem[];
}
