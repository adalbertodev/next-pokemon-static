import { FC, useMemo } from "react";

import { Card } from "@/components/ui/molecules/Card";
import { TypeList } from "@/components/ui/molecules/TypeList";
import { Pokemon } from "@/sections/Pokemon";

import { DataContainer, DataItem } from "./PokemonDataCard.styles";

interface Props {
	pokemon: Pokemon;
}

export const PokemonDataCard: FC<Props> = ({ pokemon }) => {
	const pokemonData = useMemo(
		() => [
			{
				label: "Pokédex Nacional",
				value: `#${pokemon.id}`,
			},
			{
				label: "Peso",
				value: `${pokemon.weight} kg`,
			},
			{
				label: "Altura",
				value: `${pokemon.height} m`,
			},
			{
				label: "Tipo",
				value: <TypeList types={pokemon.types.map((type) => type.name)} />,
			},
			{
				label: "Habilidad",
				value: pokemon.abilities.map((ability) =>
					ability.isHidden ? (
						<abbr key={ability.name} title="Habilidad Oculta">
							{ability.name},{" "}
						</abbr>
					) : (
						<span key={ability.name}>{ability.name}, </span>
					)
				),
			},
		],
		[pokemon]
	);

	return (
		<Card
			title="Datos"
			description={
				<DataContainer>
					{pokemonData.map((data) => (
						<DataItem key={data.label}>
							<p>{data.label}:</p>
							<div>{data.value}</div>
						</DataItem>
					))}
				</DataContainer>
			}
		/>
	);
};
