import { PokeApiNamedResource } from "./PokeApiCommon";

export interface PokeApiAbility {
	ability: PokeApiNamedResource;
	is_hidden: boolean;
	slot: number;
}

interface VersionGameIndex {
	game_index: number;
	version: PokeApiNamedResource;
}

interface PokemonHeldItemVersion {
	rarity: number;
	version: PokeApiNamedResource;
}

interface PokemonHeldItem {
	item: PokeApiNamedResource;
	version_details: PokemonHeldItemVersion[];
}

interface PokemonMoveVersion {
	level_learned_at: number;
	move_learn_method: PokeApiNamedResource;
	version_group: PokeApiNamedResource;
}

export interface PokeApiMove {
	move: PokeApiNamedResource;
	version_group_details: PokemonMoveVersion[];
}

export interface PokeApiType {
	slot: number;
	type: PokeApiNamedResource;
}

interface PastTypes {
	generation: PokeApiNamedResource;
	types: PokeApiType[];
}

interface DreamWorld {
	front_default: string | null;
	front_female: string | null;
}

interface OfficialArtwork {
	front_default: string | null;
}

interface Home {
	front_default: string | null;
	front_female: string | null;
	front_shiny: string | null;
	front_shiny_female: string | null;
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

interface OtherPokemonSprites {
	dream_world: DreamWorld;
	home: Home;
	"official-artwork": OfficialArtwork;
}

export interface PokeApiPokemonSprites {
	front_default: string | null;
	front_shiny: string | null;
	front_female: string | null;
	front_shiny_female: string | null;
	back_default: string | null;
	back_shiny: string | null;
	back_female: string | null;
	back_shiny_female: string | null;
	other?: OtherPokemonSprites;
	versions: VersionSprites;
}

export interface PokeApiStat {
	base_stat: number;
	effort: number;
	stat: PokeApiNamedResource;
}

export interface PokeApiPokemon {
	abilities: PokeApiAbility[];
	base_experience: number;
	forms: PokeApiNamedResource[];
	game_indices: VersionGameIndex[];
	height: number;
	held_items: PokemonHeldItem[];
	id: number;
	is_default: boolean;
	location_area_encounters: string;
	moves: PokeApiMove[];
	name: string;
	order: number;
	past_types: PastTypes[];
	species: PokeApiNamedResource;
	sprites: PokeApiPokemonSprites;
	stats: PokeApiStat[];
	types: PokeApiType[];
	weight: number;
}
