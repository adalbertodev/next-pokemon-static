import { Card, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FC, useCallback } from "react";

import { SmallPokemon } from "@/sections/PokemonList";

interface Props {
	pokemon: SmallPokemon;
}

export const PokemonSmallCard: FC<Props> = ({ pokemon }) => {
	const router = useRouter();

	const onPokemonCardClick = useCallback(() => {
		router.push(`/pokemon/${pokemon.id}`).catch((error) => console.error(error));
	}, [pokemon.id, router]);

	return (
		<Card isHoverable isPressable onClick={onPokemonCardClick} css={{ padding: "0" }}>
			<Card.Body
				css={{
					justifyContent: "center",
					padding: "var(--nextui-space-1)",
					paddingTop: "var(--nextui-space-7)",
				}}
			>
				<Card.Image
					src={pokemon.img}
					alt={pokemon.name}
					width="100%"
					height={120}
					css={{ objectFit: "contain" }}
				/>
			</Card.Body>

			<Card.Footer
				css={{
					justifyContent: "space-between",
				}}
			>
				<p>#{pokemon.id}</p>

				<Text
					transform="capitalize"
					css={{
						fontWeight: "bold",
						letterSpacing: "var(--nextui-letterSpacings-normal)",
					}}
				>
					{pokemon.name}
				</Text>
			</Card.Footer>
		</Card>
	);
};
