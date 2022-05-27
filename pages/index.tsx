import type { NextPage } from 'next';
import { Layout } from '../components/layouts';
import { GetStaticProps } from 'next';

const HomePage: NextPage = (props) => {
  console.log(props);
  return (
    <Layout title='Listado de Pokémons'>
      <ul>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
        <li>Pokémon</li>
      </ul>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {}
  };
};

export default HomePage;
