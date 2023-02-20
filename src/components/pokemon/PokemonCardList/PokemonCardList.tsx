import { Grid } from "@nextui-org/react";
import { FC } from "react";

import { SmallPokemon } from "@/sections/PokemonList";

import { PokemonSmallCard } from "../PokemonSmallCard";
import styles from "./PokemonCardList.module.css";

interface Props {
	pokemons: SmallPokemon[];
}

export const PokemonCardList: FC<Props> = ({ pokemons }) => {
	return (
		<Grid.Container gap={2} className={styles.grid_container}>
			{pokemons.map((pokemon) => (
				<Grid xs={6} sm={4} md={2} xl={1.2} key={pokemon.id}>
					<PokemonSmallCard pokemon={pokemon} />
				</Grid>
			))}
		</Grid.Container>
	);
};
