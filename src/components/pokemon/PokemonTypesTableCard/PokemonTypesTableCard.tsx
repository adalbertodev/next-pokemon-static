import { FC } from "react";

import { Card } from "@/components/ui/molecules/Card";
import { Table } from "@/components/ui/molecules/Table";
import { TypeList } from "@/components/ui/molecules/TypeList";
import { TypeRelation } from "@/sections/Pokemon";
import { decimalToFraction } from "@/utils";

import styles from "./PokemonTypesTableCard.module.css";

interface Props {
	title?: string;
	damageLabel?: string;
	multipliers: number[];
	types: TypeRelation[];
}

export const PokemonTypesTableCard: FC<Props> = ({ title, damageLabel, multipliers, types }) => {
	const multipliersRows = multipliers.map((multiplier) => {
		const label =
			multiplier < 1 && multiplier !== 0 ? decimalToFraction(multiplier) : `x${multiplier}`;

		const filteredTypes = types
			.filter((type) => type.multiplier === multiplier)
			.map((type) => type.name)
			.sort();

		return {
			label,
			multiplier,
			types: filteredTypes.length > 0 ? filteredTypes : undefined,
		};
	});

	return (
		<Card header={title}>
			<Table
				align="center"
				columns={[
					{ key: "damage", label: damageLabel ?? "Daño", className: styles.header_cell__damage },
					{ key: "types", label: "Tipos" },
				]}
				rows={multipliersRows.map((row) => ({
					damage: <div className={styles.row_cell__damage}>{row.label}</div>,
					types: (
						<div className={styles.row_cell__types}>
							{row.types ? <TypeList types={row.types} /> : "Ninguno"}
						</div>
					),
				}))}
			/>
		</Card>
	);
};
