import { PokemonFavorite, PokemonFavoriteRepository } from "../domain";

export class LocalStoragePokemonFavoriteRepository implements PokemonFavoriteRepository {
	private readonly localStorageKey = "favorites";

	public search = async (): Promise<PokemonFavorite[]> => {
		const data = localStorage.getItem(this.localStorageKey);

		if (!data) {
			return Promise.resolve([]);
		}

		const pokemonFavorites: PokemonFavorite[] = (JSON.parse(data) as string[]).map((id) => ({
			id: Number(id),
		}));

		return Promise.resolve(pokemonFavorites);
	};

	public async toggle(pokemonFavorite: PokemonFavorite): Promise<void> {
		const currentPokemonFavorites = await this.search();

		const existFavorite =
			currentPokemonFavorites.find(
				(favorite) => JSON.stringify(favorite) === JSON.stringify(pokemonFavorite)
			) !== undefined;

		const newPokemonFavorites = existFavorite
			? currentPokemonFavorites.filter(
					(favorite) => JSON.stringify(favorite) !== JSON.stringify(pokemonFavorite)
			  )
			: [...currentPokemonFavorites, pokemonFavorite];

		const idsToSave = newPokemonFavorites.map((favorite) => favorite.id);

		localStorage.setItem(this.localStorageKey, JSON.stringify(idsToSave));
	}
}
