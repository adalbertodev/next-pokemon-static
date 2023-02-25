export const toggleFavorite = (id: number): void => {
	// eslint-disable-next-line no-console
	console.log("toggle favorito", id);

	let favorites = JSON.parse(localStorage.getItem("favorites") ?? "[]") as number[];

	if (favorites.includes(id)) {
		favorites = favorites.filter((favoriteId) => favoriteId !== id);
	} else {
		favorites.push(id);
	}

	localStorage.setItem("favorites", JSON.stringify(favorites));
};
