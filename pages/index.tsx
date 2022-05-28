import type { NextPage, GetStaticProps } from 'next';

import { pokeApi } from '../api';
import { Layout } from '../components/layouts';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { PokemonList } from '../components/pokemon';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title='Listado de Pokémons'>
      <PokemonList pokemons={pokemons} />
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map((result) => {
    const id = result.url.split('pokemon/')[1].replace('/', '');
    const img = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
    return {
      ...result,
      id,
      img
    };
  });

  return {
    props: { pokemons }
  };
};

export default HomePage;
