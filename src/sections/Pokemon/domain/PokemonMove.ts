import { Type } from "./PokemonType";

export const DamageClassValues = ["físico", "especial", "estado"] as const;

export type DamageClass = (typeof DamageClassValues)[number];

export interface PokemonMoveBase {
	name: string;
	type: Type;
	damageClass: DamageClass | null;
	power: number;
	accuracy: number;
}

export interface PokemonMove extends PokemonMoveBase {
	learnedLevel: number;
}
