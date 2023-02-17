import { Type } from "./PokemonType";

export const DamageClassValues = ["physical", "special", "status"] as const;

export type DamageClass = (typeof DamageClassValues)[number];

interface MoveVersionDetails {
	version: string;
	learnedLevel: number;
}

export interface PokemonMoveBase {
	name: string;
	type: Type;
	damageClass: DamageClass | null;
	power: number;
	accuracy: number;
}

export interface PokemonMove extends PokemonMoveBase {
	versionDetails: MoveVersionDetails[];
}
