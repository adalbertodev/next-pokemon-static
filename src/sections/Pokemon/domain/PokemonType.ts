export const TypeValues = [
	"Acero",
	"Agua",
	"Bicho",
	"Dragón",
	"Eléctrico",
	"Fantasma",
	"Fuego",
	"Hada",
	"Hielo",
	"Lucha",
	"Normal",
	"Planta",
	"Psíquico",
	"Roca",
	"Siniestro",
	"Tierra",
	"Veneno",
	"Volador",
] as const;

export type Type = (typeof TypeValues)[number];

export interface TypeRelation {
	name: Type;
	multiplier: number;
}

export interface TypeRelations {
	asDefender: TypeRelation[];
	asAttacker: TypeRelation[];
}

export interface PokemonTypeRelations {
	name: Type;
	damageRelations: TypeRelations;
}

export interface PokemonType {
	name: Type;
}
