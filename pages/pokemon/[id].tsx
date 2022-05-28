import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts';
import { Pokemon } from '../../interfaces';

interface Props {
  pokemon: Pokemon;
}

const PokemonPage: NextPage<Props> = ({ pokemon }) => {
  const { id, name } = pokemon;

  return (
    <Layout title='Algún Pokémon'>
      <h1>{name}</h1>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const pokemons151 = [...Array(151)].map((value, i) => `${i + 1}`);

  return {
    paths: pokemons151.map((id) => ({
      params: { id }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };
  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${id}`);

  return {
    props: { pokemon: data }
  };
};

export default PokemonPage;
