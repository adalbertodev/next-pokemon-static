import Image from "next/image";

import styles from "./Navbar.module.css";

export const Navbar = () => {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>
				<Image
					src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
					alt="Icono de la aplicacioón"
					width={70}
					height={70}
				/>
				<span>P</span>okédex
			</h1>

			<p>Favoritos</p>
		</div>
	);
};
