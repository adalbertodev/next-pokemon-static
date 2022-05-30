import { FC } from 'react';
import Head from 'next/head';
import { Navbar } from '../ui';

interface Props {
  children: JSX.Element | JSX.Element[];
  title?: string;
}

const origin = typeof window === 'undefined' ? '' : window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {
  const name = title?.split('- ')[1].toLowerCase();

  return (
    <>
      <Head>
        <title>{title || 'PokemonApp'}</title>
        <meta name='author' content='Adalberto' />
        <meta
          name='description'
          content={`Información sobre el pokémon ${name}`}
        />
        <meta name='keywords' content={`${name}, pokemon, pokedex`} />
        <meta property='og:title' content={`Información sobre ${name}`} />
        <meta
          property='og:description'
          content={`Esta es la página sobre ${name}`}
        />
        <meta property='og:image' content={`${origin}/img/banner.png`} />
      </Head>

      <Navbar />

      <main
        style={{
          padding: '0rem 1.25rem'
        }}
      >
        {children}
      </main>
    </>
  );
};
