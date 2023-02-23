import { FC } from "react";

import { Card } from "@/components/ui/molecules/Card";
import { Table } from "@/components/ui/molecules/Table";
import { TypeList } from "@/components/ui/molecules/TypeList";
import { Type } from "@/sections/Pokemon";

import styles from "./PokemonTypesTableCard.module.css";

interface Row {
	damage: string;
	types: Type[] | undefined;
}

interface Props {
	title?: string;
	damageLabel?: string;
	rows: Row[];
}

export const PokemonTypesTableCard: FC<Props> = ({ title, damageLabel, rows }) => {
	return (
		<Card
			title={title}
			description={
				<Table
					align="center"
					columns={[
						{ key: "damage", label: damageLabel ?? "Daño", className: styles.header_cell__damage },
						{ key: "types", label: "Tipos" },
					]}
					rows={rows.map((row) => ({
						damage: <div className={styles.row_cell__damage}>{row.damage}</div>,
						types: (
							<div className={styles.row_cell__types}>
								{row.types ? <TypeList types={row.types} /> : "Ninguno"}
							</div>
						),
					}))}
				/>
			}
		/>
	);
};
