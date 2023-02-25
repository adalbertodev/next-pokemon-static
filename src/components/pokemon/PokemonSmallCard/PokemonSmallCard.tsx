import { Card, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";

import { SmallPokemon } from "@/sections/PokemonList";

import styles from "./PokemonSmallCard.module.css";

interface Props {
	pokemon: SmallPokemon;
}

export const PokemonSmallCard: FC<Props> = ({ pokemon }) => {
	const router = useRouter();

	const onPokemonCardClick = useCallback(() => {
		router.push(`/pokemon/${pokemon.id}`).catch((error) => console.error(error));
	}, [pokemon.id, router]);

	return (
		<Card isHoverable isPressable onPress={onPokemonCardClick} className={styles.card}>
			<Card.Body className={styles.card_body}>
				<Card.Image
					src={pokemon.img}
					alt={pokemon.name}
					width="100%"
					height={120}
					objectFit="contain"
				/>
			</Card.Body>

			<Card.Footer className={styles.card_footer}>
				<p>#{pokemon.id}</p>

				<Text transform="capitalize" className={styles.card_footer__name}>
					{pokemon.name}
				</Text>
			</Card.Footer>
		</Card>
	);
};
