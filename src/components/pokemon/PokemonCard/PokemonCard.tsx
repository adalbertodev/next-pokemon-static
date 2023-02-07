import { Card, Grid } from "@nextui-org/react";
import { FC } from "react";

import { PokemonItem } from "@/sections/PokemonList";

import styles from "./PokemonCard.module.css";

interface Props {
	pokemon: PokemonItem;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {
	return (
		<Grid className={styles.container}>
			<Card isHoverable isPressable>
				<Card.Body className={styles.card__body}>
					<Card.Image src={pokemon.img} alt={pokemon.name} className={styles.card__image} />
				</Card.Body>

				<Card.Footer className={styles.card__footer}>
					<p>{pokemon.name}</p>

					<p>#{pokemon.id}</p>
				</Card.Footer>
			</Card>
		</Grid>
	);
};
