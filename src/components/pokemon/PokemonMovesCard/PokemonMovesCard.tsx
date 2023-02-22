import { FC } from "react";

import { DamageClass } from "@/components/ui/atoms/DamageClass";
import { Type } from "@/components/ui/atoms/Type";
import { Card } from "@/components/ui/molecules/Card";
import { Table } from "@/components/ui/molecules/Table";
import { PokemonMove } from "@/sections/Pokemon";

import styles from "./PokemonMovesCard.module.css";

interface Props {
	moves: PokemonMove[];
}

export const PokemonMovesCard: FC<Props> = ({ moves }) => {
	const sortedMoves = moves.sort((moveA, moveB) => {
		const criteria = [
			{ key: "Nv.", value: 1 },
			{ key: "MT", value: 2 },
			{ key: "Tutor", value: 3 },
			{ key: "Huevo", value: 4 },
		];

		const moveAValue =
			criteria.find((rule) => new RegExp(`${rule.key}`).test(moveA.learnedMethod))?.value ?? 10;
		const moveBValue =
			criteria.find((rule) => new RegExp(`${rule.key}`).test(moveB.learnedMethod))?.value ?? 10;

		if (moveAValue === moveBValue && moveAValue === 1) {
			const moveALevel = Number(moveA.learnedMethod.replace("Nv.", ""));
			const moveBLevel = Number(moveB.learnedMethod.replace("Nv.", ""));

			return moveALevel - moveBLevel;
		}

		return moveAValue - moveBValue;
	});

	return (
		<Card
			title="Movimientos"
			description={
				<Table
					align="center"
					columns={[
						{ key: "learnedMethod", label: "Método", className: styles.method },
						{ key: "move", label: "Movimiento", className: styles.move },
						{ key: "type", label: "Tipo", className: styles.type },
						{ key: "damageClass", label: "Clase", className: styles.damage_class },
						{ key: "power", label: "Poder", className: styles.power },
						{ key: "accuracy", label: "Precisión", className: styles.accuracy },
						{ key: "pp", label: "PP", className: styles.pp },
					]}
					rows={sortedMoves.map((move) => ({
						move: move.name,
						type: (
							<div style={{ fontSize: "12px" }}>
								<Type type={move.type} />
							</div>
						),
						damageClass: move.damageClass ? (
							<div className={styles.damage_class__box}>
								<DamageClass damageClass={move.damageClass} />
							</div>
						) : (
							"unknown"
						),
						learnedMethod: move.learnedMethod,
						power: move.power === 0 ? "—" : move.power,
						accuracy: move.accuracy === 0 ? "—" : `${move.accuracy}%`,
						pp: move.pp === 0 ? "—" : move.pp,
					}))}
				/>
			}
		/>
	);
};
