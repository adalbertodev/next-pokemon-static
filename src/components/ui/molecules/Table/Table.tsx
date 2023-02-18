import { FC } from "react";

import styles from "./Table.module.css";

interface Column {
	key: string;
	label: string;
}

interface Row {
	[key: string]: string | number;
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
								className={styles.table_head__column}
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
					{rows.map((row, index) => (
						<tr
							className={styles.table_body__row}
							key={`tablerow-${index}`}
							tabIndex={-1}
							role="row"
						>
							{columns.map((column, index) => (
								<td
									className={styles.table_body__column}
									key={`${index}-${row[column.key]}`}
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
