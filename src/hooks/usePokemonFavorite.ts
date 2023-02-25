import { PokemonFavorite, PokemonFavoriteRepository } from "@/sections/PokemonFavorite";

interface UsePokemonFavoriteTools {
	search: () => Promise<PokemonFavorite[]>;
	toggleFavorite: (id: number) => Promise<void>;
	existPokemonFavorite: (id: number) => Promise<boolean>;
}

export const usePokemonFavorite = (
	pokemonFavoriteRepository: PokemonFavoriteRepository
): UsePokemonFavoriteTools => {
	const search = async (): Promise<PokemonFavorite[]> => {
		return await pokemonFavoriteRepository.search();
	};

	const toggleFavorite = async (id: number): Promise<void> => {
		await pokemonFavoriteRepository.toggle({ id });
	};

	const isPokemonFavorite = async (id: number): Promise<boolean> => {
		const pokemonFavorites = await search();

		return pokemonFavorites.find((favorite) => favorite.id === id) !== undefined;
	};

	return {
		search,
		toggleFavorite,
		existPokemonFavorite: isPokemonFavorite,
	};
};
