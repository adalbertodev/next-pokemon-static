import Head from "next/head";
import path from "path";
import { FC } from "react";

import { Navbar } from "../..";
import styles from "./Layout.module.css";

interface Props {
	children: React.ReactNode;
	title?: string;
	name?: string;
}

export const Layout: FC<Props> = ({ children, title, name }) => {
	const metaName = name ?? title ?? "";

	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />

				<title>{title ?? "Pokedex"}</title>

				<meta name="description" content={`Información sobre el pokémon ${metaName}`} />
				<meta name="author" content="Adalberto Perdomo" />
				<meta name="keywords" content={`${metaName}, pokemon, pokedex`} />
				<meta name="robots" content="index, follow" />

				<meta property="og:title" content={`Información sobre ${metaName}`} />
				<meta property="og:description" content={`Esta es la página sobre ${metaName}`} />
				<meta property="og:image" content={path.join(__dirname, "/img/banner.png")} />

				<link rel="icon" href="/icons/pokekadicon.ico" />
			</Head>

			<Navbar />

			<main className={styles.container}>{children}</main>
		</>
	);
};
