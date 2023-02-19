import { FC } from "react";

import styles from "./Table.module.css";

interface Column {
	key: string;
	label: string;
}

interface Row {
	[key: string]: React.ReactNode;
}

interface Props {
	columns: Column[];
	rows: Row[];
}

export const Table: FC<Props> = ({ columns, rows }) => {
	return (
		<div className={styles.table_container}>
			<table className={styles.table} role="grid">
				<thead role="rowgroup">
					<tr className={styles.table_head__row} role="row">
						{columns.map((column) => (
							<th
								className={styles.table_head__cell}
								key={column.key}
								tabIndex={-1}
								role="columnHeader"
							>
								{column.label}
							</th>
						))}
					</tr>
				</thead>

				<tbody className={styles.table_body} role="rowgroup">
					{rows.map((row, rowIndex) => (
						<tr className={styles.table_body__row} key={`row-${rowIndex}`} tabIndex={-1} role="row">
							{columns.map((column, cellIndex) => (
								<td
									className={styles.table_body__cell}
									key={`row-${rowIndex}_cell-${cellIndex}`}
									tabIndex={-1}
									role="rowheader"
								>
									{row[column.key]}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};
