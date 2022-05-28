import { Grid } from '@nextui-org/react';
import { FC } from 'react';
import { SmallPokemon } from '../../interfaces';
import { PokemonCard } from './PokemonCard';

interface Props {
  pokemons: SmallPokemon[];
}

export const PokemonList: FC<Props> = ({ pokemons }) => {
  return (
    <Grid.Container gap={2} justify='flex-start'>
      {pokemons.map((pokemon) => (
        <Grid xs={6} sm={3} md={2} xl={1} key={pokemon.id}>
          <PokemonCard pokemon={pokemon} />
        </Grid>
      ))}
    </Grid.Container>
  );
};
