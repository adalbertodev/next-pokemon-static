import { NextPage } from "next";

import { Home } from "@/components/pages/Home";
import { Layout } from "@/components/ui/templates";

const HomePage: NextPage = () => {
	return (
		<Layout title="Pokedex">
			<Home />
		</Layout>
	);
};

export default HomePage;
