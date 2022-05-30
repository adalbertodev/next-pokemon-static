import { pokeApi } from '../api';
import { Pokemon, PokemonData } from '../interfaces';

export const getPokemonInfo = async (nameOrId: string): Promise<Pokemon> => {
  const { data } = await pokeApi.get<PokemonData>(`/pokemon/${nameOrId}`);

  return {
    id: data.id,
    name: data.name,
    sprites: data.sprites
  };
};
