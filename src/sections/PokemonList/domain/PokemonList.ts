export interface PokemonItem {
	name: string;
	id: number;
	img: string;
}

export interface PokemonList {
	pokemons: PokemonItem[];
}
