export const config = {
	pageName: "Pokekad",
	pokemonMoves: {
		methods: [
			{ key: "level-up", label: "Nv." },
			{ key: "machine", label: "MT" },
			{ key: "tutor", label: "Tutor" },
			{ key: "egg", label: "Huevo" },
		] as const,
		versions: [
			"scarlet-violet",
			"brilliant-diamond-and-shining-pearl",
			"sword-shield",
			"ultra-sun-ultra-moon",
			"sun-moon",
			"omega-ruby-alpha-sapphire",
		] as const,
	},
};
