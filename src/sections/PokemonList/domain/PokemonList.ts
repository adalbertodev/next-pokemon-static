export interface SmallPokemon {
	name: string;
	id: number;
	img: string;
}

export interface PokemonList {
	pokemons: SmallPokemon[];
}
