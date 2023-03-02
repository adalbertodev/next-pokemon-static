import { Card } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";

import { SmallPokemon } from "@/sections/PokemonList";

import styles from "./PokemonImageCard.module.css";

interface Props {
	pokemon: SmallPokemon;
}

export const PokemonImageCard: FC<Props> = ({ pokemon }) => {
	const router = useRouter();

	const onPokemonCardClick = useCallback(() => {
		router.push(`/pokemon/${pokemon.id}`).catch((error) => console.error(error));
	}, [pokemon.id, router]);

	return (
		<Card isHoverable onClick={onPokemonCardClick} className={styles.card}>
			<Card.Body className={styles.card_body}>
				<Card.Image
					src={pokemon.img}
					alt={pokemon.name}
					width="100%"
					height={240}
					objectFit="contain"
				/>
			</Card.Body>
		</Card>
	);
};
