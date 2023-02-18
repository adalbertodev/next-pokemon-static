import { useRouter } from "next/router";
import { FC, useCallback, useMemo } from "react";

import { PokemonItem } from "@/sections/PokemonList";

import { Card, CardBody, CardFooter, CardImage, CardName } from "./PokemonCard.styles";

interface VariantProps {
	pokemon: PokemonItem;
	onClick: () => void;
}

const DefaultPokemonCard: FC<VariantProps> = ({ pokemon, onClick }) => {
	return (
		<Card variant="default" onClick={onClick}>
			<CardBody>
				<CardImage src={pokemon.img} alt={pokemon.name} />
			</CardBody>
		</Card>
	);
};

const WithNamePokemonCard: FC<VariantProps> = ({ pokemon, onClick }) => {
	return (
		<Card variant="withName" onClick={onClick}>
			<CardBody>
				<CardImage src={pokemon.img} alt={pokemon.name} />
			</CardBody>

			<CardFooter>
				<p>#{pokemon.id}</p>

				<CardName>{pokemon.name}</CardName>
			</CardFooter>
		</Card>
	);
};

interface Props {
	pokemon: PokemonItem;

	variant?: "default" | "withName";
}

export const PokemonCard: FC<Props> = ({ pokemon, variant = "default" }) => {
	const router = useRouter();

	const onPokemonCardClick = useCallback(() => {
		router.push(`/pokemon/${pokemon.id}`).catch((error) => console.error(error));
	}, [pokemon.id, router]);

	const variantProps: VariantProps = useMemo(
		() => ({
			pokemon,
			onClick: onPokemonCardClick,
		}),
		[onPokemonCardClick, pokemon]
	);

	if (variant === "withName") {
		return <WithNamePokemonCard {...variantProps} />;
	}

	return <DefaultPokemonCard {...variantProps} />;
};
