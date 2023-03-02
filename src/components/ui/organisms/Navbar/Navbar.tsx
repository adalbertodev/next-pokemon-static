import { Image } from "@nextui-org/react";
import NextLink from "next/link";

import { config } from "@/config";

import { FavButton } from "../../atoms";
import styles from "./Navbar.module.css";

export const Navbar = () => {
	const pageName = config.pageName;

	return (
		<div className={styles.container}>
			<NextLink href="/" className={styles.title}>
				<Image
					src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/132.gif"
					alt="Icono de la aplicacioón"
					width={32}
					height={32}
				/>

				<h2 className={styles.title__text}>{pageName}</h2>
			</NextLink>

			<FavButton auto>
				<NextLink href="/favorites">Favoritos</NextLink>
			</FavButton>
		</div>
	);
};
