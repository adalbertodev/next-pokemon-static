import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { GetStaticProps, GetStaticPaths } from 'next';

import { Grid, Card, Button, Container, Text, Image } from '@nextui-org/react';
import confetti from 'canvas-confetti';

import { getPokemonInfo, localFavorites } from '../../utils';
import { Layout } from '../../components/layouts';
import { pokeApi } from '../../api';
import { Pokemon, PokemonListResponse } from '../../interfaces';

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: FC<Props> = ({ pokemon }) => {
  const { id, name } = pokemon;
  const [isInFavorites, setIsInFavorites] = useState(false);

  const capitalizedName = useMemo(
    () => name.charAt(0).toUpperCase() + name.slice(1),
    [name]
  );

  const onToggleFavorite = useCallback(() => {
    localFavorites.toggleFavorite(id);
    setIsInFavorites((isInFavorites) => !isInFavorites);

    if (isInFavorites) return;

    confetti({
      zIndex: 10,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    });
  }, [id, isInFavorites]);

  useEffect(() => {
    setIsInFavorites(localFavorites.existInFavorites(id));
  }, [id]);

  return (
    <Layout title={`#${id} - ${capitalizedName}`}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image
                src={
                  pokemon.sprites.other?.dream_world.front_default ||
                  'no-image.png'
                }
                alt={name}
                width='100%'
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header
              css={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Text h1 transform='capitalize'>
                {name}
              </Text>
              <Button
                color='gradient'
                ghost={!isInFavorites}
                onPress={onToggleFavorite}
              >
                {isInFavorites ? 'En Favoritos' : 'Guardar en Favoritos'}
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction='row' display='flex' gap={0}>
                <Image
                  src={pokemon.sprites.front_default}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_default}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.front_shiny}
                  alt={name}
                  width={100}
                  height={100}
                />
                <Image
                  src={pokemon.sprites.back_shiny}
                  alt={name}
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=151`);

  return {
    paths: data.results.map(({ name }) => ({
      params: { name }
    })),
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  return {
    props: { pokemon: await getPokemonInfo(name) },
    revalidate: 86400
  };
};

export default PokemonByNamePage;
