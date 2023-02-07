import Image from "next/image";
import Link from "next/link";

import styles from "./Navbar.module.css";

export const Navbar = () => {
	return (
		<div className={styles.container}>
			<Link href="/" className={styles.title}>
				<Image
					src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/132.gif"
					alt="Icono de la aplicacioón"
					width={32}
					height={32}
				/>

				<h1>
					<span>P</span>okédex
				</h1>
			</Link>

			<p>Favoritos</p>
		</div>
	);
};
