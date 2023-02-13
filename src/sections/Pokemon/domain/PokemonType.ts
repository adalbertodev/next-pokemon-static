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

export interface TypeRelations {
	noDamageTo: Type[];
	halfDamageTo: Type[];
	doubleDamageTo: Type[];
	noDamageFrom: Type[];
	halfDamageFrom: Type[];
	doubleDamageFrom: Type[];
}

export interface PokemonType {
	name: Type;
	damageRelations: TypeRelations;
}
