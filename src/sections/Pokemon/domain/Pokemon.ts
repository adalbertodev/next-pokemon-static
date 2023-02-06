interface PokemonAbility {
	name: string;
	is_hidden: boolean;
}

interface PokemonMoveDetails {
	level_learned_at: number;
	move_learn_method: string;
	version: string;
}

interface PokemonMove {
	name: string;
	details: PokemonMoveDetails[];
}

interface RedBlue {
	back_default: string | null;
	back_gray: string | null;
	back_transparent: string | null;
	front_default: string | null;
	front_gray: string | null;
	front_transparent: string | null;
}

interface Yellow {
	back_default: string | null;
	back_gray: string | null;
	back_transparent: string | null;
	front_default: string | null;
	front_gray: string | null;
	front_transparent: string | null;
}

interface GenerationISprites {
	"red-blue": RedBlue;
	yellow: Yellow;
}

interface Crystal {
	back_default: string | null;
	back_shiny: string | null;
	back_shiny_transparent: string | null;
	back_transparent: string | null;
	front_default: string | null;
	front_shiny: string | null;
	front_shiny_transparent: string | null;
	front_transparent: string | null;
}

interface Gold {
	back_default: string | null;
	back_shiny: string | null;
	front_default: string | null;
	front_shiny: string | null;
	front_transparent: string | null;
}

interface Silver {
	back_default: string | null;
	back_shiny: string | null;
	front_default: string | null;
	front_shiny: string | null;
	front_transparent: string | null;
}

interface GenerationIISprites {
	crystal: Crystal;
	gold: Gold;
	silver: Silver;
}

interface Emerald {
	front_default: string | null;
	front_shiny: string | null;
}

interface FireredLeafgreen {
	back_default: string | null;
	back_shiny: string | null;
	front_default: string | null;
	front_shiny: string | null;
}

interface RubySapphire {
	back_default: string | null;
	back_shiny: string | null;
	front_default: string | null;
	front_shiny: string | null;
}

interface GenerationIIISprites {
	emerald: Emerald;
	"firered-leafgreen": FireredLeafgreen;
	"ruby-sapphire": RubySapphire;
}

interface DiamondPearl {
	back_default: string | null;
	back_shiny: string | null;
	back_female: string | null;
	front_default: string | null;
	front_shiny: string | null;
	back_shiny_female: string | null;
	front_female: string | null;
	front_shiny_female: string | null;
}

interface HeartgoldSoulsilver {
	back_default: string | null;
	back_shiny: string | null;
	back_female: string | null;
	front_default: string | null;
	front_shiny: string | null;
	back_shiny_female: string | null;
	front_female: string | null;
	front_shiny_female: string | null;
}

interface Platinum {
	back_default: string | null;
	back_shiny: string | null;
	back_female: string | null;
	front_default: string | null;
	front_shiny: string | null;
	back_shiny_female: string | null;
	front_female: string | null;
	front_shiny_female: string | null;
}

interface GenerationIVSprites {
	"diamond-pearl": DiamondPearl;
	"heartgold-soulsilver": HeartgoldSoulsilver;
	platinum: Platinum;
}

interface Animated {
	back_default: string | null;
	back_shiny: string | null;
	back_female: string | null;
	front_default: string | null;
	front_shiny: string | null;
	back_shiny_female: string | null;
	front_female: string | null;
	front_shiny_female: string | null;
}

interface BlackWhite {
	animated: Animated;
	back_default: string | null;
	back_shiny: string | null;
	back_female: string | null;
	front_default: string | null;
	front_shiny: string | null;
	back_shiny_female: string | null;
	front_female: string | null;
	front_shiny_female: string | null;
}

interface GenerationVSprites {
	"black-white": BlackWhite;
}

interface OmegarubyAlphasapphire {
	front_default: string | null;
	front_female: string | null;
	front_shiny: string | null;
	front_shiny_female: string | null;
}

interface XY {
	front_default: string | null;
	front_female: string | null;
	front_shiny: string | null;
	front_shiny_female: string | null;
}

interface GenerationVISprites {
	"omegaruby-alphasapphire": OmegarubyAlphasapphire;
	"x-y": XY;
}

interface GenerationViiIcons {
	front_default: string | null;
	front_female: string | null;
}

interface UltraSunUltraMoon {
	front_default: string | null;
	front_female: string | null;
	front_shiny: string | null;
	front_shiny_female: string | null;
}

interface GenerationVIISprites {
	icons: GenerationViiIcons;
	"ultra-sun-ultra-moon": UltraSunUltraMoon;
}

interface GenerationViiiIcons {
	front_default: string | null;
	front_female: string | null;
}

interface GenerationVIIISprites {
	icons: GenerationViiiIcons;
}

interface VersionSprites {
	"generation-i": GenerationISprites;
	"generation-ii": GenerationIISprites;
	"generation-iii": GenerationIIISprites;
	"generation-iv": GenerationIVSprites;
	"generation-v": GenerationVSprites;
	"generation-vi": GenerationVISprites;
	"generation-vii": GenerationVIISprites;
	"generation-viii": GenerationVIIISprites;
}

interface PokemonSprites {
	default: string | null;
	versions: VersionSprites;
}

interface PokemonStat {
	name: string;
	base: number;
	effort: number;
}

export interface Pokemon {
	id: number;
	name: string;

	weight: number;
	height: number;

	abilities: PokemonAbility[];
	types: string[];

	base_experience: number;
	held_items: string[];
	location_area_encounters: string;
	moves: PokemonMove[];
	sprites: PokemonSprites;
	stats: PokemonStat[];
}
