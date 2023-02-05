import { NextPage } from "next";

import { Home, Layout } from "@/components/ui";

const HomePage: NextPage = () => {
	return (
		<Layout title="Pokedex">
			<Home />
		</Layout>
	);
};

export default HomePage;
