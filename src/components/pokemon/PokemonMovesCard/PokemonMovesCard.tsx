import { FC } from "react";

import { Card } from "@/components/ui/molecules/Card";
import { Table } from "@/components/ui/molecules/Table";
import { TypeList } from "@/components/ui/molecules/TypeList";
import { PokemonMove } from "@/sections/Pokemon";

interface Props {
	moves: PokemonMove[];
}

export const PokemonMovesCard: FC<Props> = ({ moves }) => {
	const sortedMoves = moves.sort((moveA, moveB) => {
		const criteria = [
			{ key: "Nv.", value: 1 },
			{ key: "MT", value: 2 },
			{ key: "Tutor", value: 3 },
			{ key: "Mov. Huevo", value: 4 },
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
					columns={[
						{ key: "learnedMethod", label: "Método" },
						{ key: "move", label: "Movimiento" },
						{ key: "type", label: "Tipo" },
						{ key: "damageClass", label: "Clase" },
						{ key: "power", label: "Poder" },
						{ key: "accuracy", label: "Precisión" },
						{ key: "pp", label: "PP" },
					]}
					rows={sortedMoves.map((move) => ({
						move: move.name,
						type: <TypeList types={[move.type]} />,
						damageClass: move.damageClass ?? "unknown",
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
