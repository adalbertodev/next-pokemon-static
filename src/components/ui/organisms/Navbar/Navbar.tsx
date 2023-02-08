import { Image, Link } from "@nextui-org/react";
import NextLink from "next/link";

import styles from "./Navbar.module.css";

export const Navbar = () => {
	return (
		<div className={styles.container}>
			<NextLink href="/" legacyBehavior>
				<Link className={styles.title} color="text">
					<Image
						src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/132.gif"
						alt="Icono de la aplicacioón"
						width={32}
						height={32}
					/>

					<h2>
						<span>P</span>okédex
					</h2>
				</Link>
			</NextLink>

			<NextLink href="/favorites" legacyBehavior>
				<Link color="text">Favoritos</Link>
			</NextLink>
		</div>
	);
};
