import { NextPage } from "next";
import Head from "next/head";

import { Home } from "@/components/Home";

const HomePage: NextPage = () => {
	return (
		<>
			<Head>
				<title>Pokedex</title>
				<meta name="description" content="Pokedex page where there are the first 151 pokemons" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/icons/favicon.ico" />
			</Head>

			<Home />
		</>
	);
};

export default HomePage;
