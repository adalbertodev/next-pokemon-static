const toggleFavorite = (id: number): void => {
  let favorites: number[] = JSON.parse(
    localStorage.getItem('favorites') || '[]'
  );

  favorites = favorites.includes(id)
    ? favorites.filter((pokeId) => pokeId !== id)
    : [...favorites, id];

  localStorage.setItem('favorites', JSON.stringify(favorites));
};

const existInFavorites = (id: number): boolean => {
  const favorites: number[] = JSON.parse(
    localStorage.getItem('favorites') || '[]'
  );

  return favorites.includes(id);
};

const pokemons = (): number[] => {
  return JSON.parse(localStorage.getItem('favorites') || '[]');
};

const exportObject = { toggleFavorite, existInFavorites, pokemons };

export default exportObject;
