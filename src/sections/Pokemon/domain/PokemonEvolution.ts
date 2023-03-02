import { SmallPokemon } from "@/sections/PokemonList";

interface EvolutionStep {
	pokemons: SmallPokemon[];
}

export interface PokemonEvolution {
	evolutionChain: EvolutionStep[];
}
