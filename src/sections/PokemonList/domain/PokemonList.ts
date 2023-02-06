export interface PokemonItem {
	name: string;
	url: string;
	id: number;
	img: string;
}

export interface PokemonList {
	pokemons: PokemonItem[];
}
