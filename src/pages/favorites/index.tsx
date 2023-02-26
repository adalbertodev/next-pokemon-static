import { NextPage } from "next";

import { PokemonFavoriteList } from "@/components/pokemon";
import { Layout } from "@/components/ui";
import { config } from "@/config";

const FavoritesPage: NextPage = () => {
	return (
		<Layout title={`Favorites | ${config.pageName} Pokédex Informativa`}>
			<PokemonFavoriteList />
		</Layout>
	);
};

export default FavoritesPage;
