import { CSSProperties, FC, useCallback, useMemo } from "react";

import { Card } from "@/components/ui/molecules/Card";
import { PokemonStat } from "@/sections/Pokemon";

import styles from "./PokemonStats.module.css";

interface Props {
	stats: PokemonStat[];
}

export const PokemonStatsCard: FC<Props> = ({ stats }) => {
	const restructuredStatsName = useMemo(
		() =>
			stats.map((stat) => ({
				label:
					stat.name === "Ataque Especial"
						? "At. Esp."
						: stat.name === "Defensa Especial"
						? "Def. Esp."
						: stat.name,
				value: stat.base,
			})),
		[stats]
	);

	const barColorValue = useCallback((value: number) => {
		return value > 100 ? 100 : value > 80 ? 80 : value > 60 ? 60 : value > 40 ? 40 : 0;
	}, []);

	return (
		<Card>
			<table className={styles.table}>
				<tbody>
					{restructuredStatsName.map((stat) => (
						<tr key={stat.label}>
							<th className={styles.table_row__head_cell}>{stat.label}:</th>

							<td className={styles.table_row__cell}>{stat.value}</td>

							<td className={styles.table_row__cell}>
								<div
									className={`${styles.bar_stat} ${
										styles[`greater_than_${barColorValue(stat.value)}`]
									}`}
									style={{ "--bar-width": stat.value } as CSSProperties}
								></div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Card>
	);
};
