import Head from "next/head";
import { FC } from "react";

import { Navbar } from "../..";
import styles from "./Layout.module.css";

interface Props {
	children: React.ReactNode;
	title?: string;
}

export const Layout: FC<Props> = ({ children, title }) => {
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				<title>{title ?? "Pokedex"}</title>

				<meta name="description" content="Información sobre el pokémon XXXXX" />
				<meta name="author" content="Adalberto Perdomo" />
				<meta name="keywords" content="XXXXX, pokemon, pokedex" />
				<meta name="robots" content="index, follow" />

				<link rel="icon" href="/icons/favicon.ico" />
			</Head>

			<Navbar />

			<main className={styles.container}>{children}</main>
		</>
	);
};
