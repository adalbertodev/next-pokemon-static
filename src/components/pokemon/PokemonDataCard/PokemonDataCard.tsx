import { Grid } from "@nextui-org/react";
import { FC, useMemo } from "react";

import { Card } from "@/components/ui/molecules/Card";
import { TypeList } from "@/components/ui/molecules/TypeList";
import { Pokemon } from "@/sections/Pokemon";

import styles from "./PokemonDataCard.module.css";

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
							{ability.name}
						</abbr>
					) : (
						<span key={ability.name}>{ability.name}</span>
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
				<Grid.Container className={styles.grid_container}>
					{pokemonData.map((data) => (
						<Grid xs={12} sm={6} key={data.label} className={styles.grid_item}>
							<label htmlFor={`data-${data.label}`} className={styles.data_card__label}>
								{data.label}:
							</label>

							<div id={`data-${data.label}`} className={styles.data_card__value}>
								{data.value}
							</div>
						</Grid>
					))}
				</Grid.Container>
			}
		/>
	);
};
