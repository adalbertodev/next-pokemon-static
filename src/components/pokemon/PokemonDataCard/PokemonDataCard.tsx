import { Grid } from "@nextui-org/react";
import { FC } from "react";

import { Card } from "@/components/ui/molecules/Card";
import { TypeList } from "@/components/ui/molecules/TypeList";
import { Pokemon } from "@/sections/Pokemon";

import styles from "./PokemonDataCard.module.css";

interface Props {
	pokemon: Pokemon;
}

export const PokemonDataCard: FC<Props> = ({ pokemon }) => {
	const DataElement = ({ label, value }: { label: string; value: React.ReactNode }) => {
		return (
			<Grid xs={12} sm={6} key={label} className={styles.grid_item}>
				<label htmlFor={`data-${label}`} className={styles.data_card__label}>
					{label}:
				</label>

				<div id={`data-${label}`} className={styles.data_card__value}>
					{value}
				</div>
			</Grid>
		);
	};

	return (
		<Card header="Datos">
			<Grid.Container className={styles.grid_container}>
				<DataElement label="Pokédex Nacional" value={`#${pokemon.id}`} />
				<DataElement label="Peso" value={`${pokemon.weight} kg`} />
				<DataElement label="Altura" value={`${pokemon.height} m`} />

				<DataElement
					label="Tipo"
					value={<TypeList variant="linked" types={pokemon.type.types.map((type) => type.name)} />}
				/>

				<DataElement
					label="Habilidad"
					value={pokemon.abilities.map((ability) =>
						ability.isHidden ? (
							<abbr key={ability.name} title="Habilidad Oculta">
								{ability.name}
							</abbr>
						) : (
							<span key={ability.name}>{ability.name}</span>
						)
					)}
				/>
			</Grid.Container>
		</Card>
	);
};
