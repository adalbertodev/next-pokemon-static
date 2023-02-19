import { FC, useCallback, useMemo } from "react";

import { Card } from "@/components/ui/molecules/Card";
import { PokemonStat } from "@/sections/Pokemon";

import styles from "./PokemonStats.module.css";

interface Props {
	stats: PokemonStat[];
}

export const PokemonStatsCard: FC<Props> = ({ stats }) => {
	const restructuredStats = useMemo(
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

	const barColor = useCallback((value: number) => {
		if (value > 100) {
			return "--nextui-colors-green800";
		}
		if (value > 80) {
			return "--nextui-colors-green600";
		}
		if (value > 60) {
			return "--nextui-colors-yellow800";
		}
		if (value > 40) {
			return "--nextui-colors-yellow600";
		}

		return "--nextui-colors-red500";
	}, []);

	return (
		<Card
			description={
				<table className={styles.table}>
					<tbody>
						{restructuredStats.map((stat) => (
							<tr key={stat.label}>
								<th className={styles.table_row__head_cell}>{stat.label}:</th>

								<td className={styles.table_row__cell}>{stat.value}</td>

								<td className={styles.table_row__cell}>
									<div
										className={styles.bar_stat}
										style={{
											backgroundColor: `var(${barColor(stat.value)})`,
											width: `calc(100% * ${stat.value} / 255)`,
										}}
									></div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			}
		/>
	);
};
