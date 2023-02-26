import { NextPage } from "next";

import { PokemonFavoriteList } from "@/components/pokemon";
import { Layout } from "@/components/ui";

const FavoritesPage: NextPage = () => {
	return (
		<Layout title="Favorites | Pokédex">
			<PokemonFavoriteList />
		</Layout>
	);
};

export default FavoritesPage;
