import { Spacer, Text, useTheme } from '@nextui-org/react';
import Image from 'next/image';
import { Link } from './Link';

export const Navbar = () => {
  const { theme } = useTheme();

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'start',
        padding: '0rem 1.25rem',
        backgroundColor: theme?.colors.gray50.value || 'black'
      }}
    >
      <Image
        src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png'
        alt='icono de la app'
        width={70}
        height={70}
      />
      <Link href='/' passHref>
        <Text color='white' h2>
          P
        </Text>
        <Text color='white' h3>
          okémon
        </Text>
      </Link>

      <Spacer css={{ flex: 1 }} />

      <Link href='/favorites' passHref css={{ marginRight: '10px' }}>
        <Text color='white'>Favoritos</Text>
      </Link>
    </div>
  );
};
