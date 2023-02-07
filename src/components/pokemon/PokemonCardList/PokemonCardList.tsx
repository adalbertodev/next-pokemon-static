import { Grid } from "@nextui-org/react";
import { FC } from "react";

import { PokemonItem } from "@/sections/PokemonList";

import { PokemonCard } from "../PokemonCard/PokemonCard";
import styles from "./PokemonCardList.module.css";

interface Props {
	pokemons: PokemonItem[];
}

export const PokemonCardList: FC<Props> = ({ pokemons }) => {
	return (
		<Grid.Container className={styles.container}>
			{pokemons.map((pokemon) => (
				<PokemonCard key={pokemon.id} pokemon={pokemon} />
			))}
		</Grid.Container>
	);
};
