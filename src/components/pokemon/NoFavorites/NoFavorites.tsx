import { Container, Image, Text } from "@nextui-org/react";

import styles from "./NoFavorites.module.css";

export const NoFavorites = () => {
	return (
		<Container className={styles.container}>
			<Text h1>No hay favoritos</Text>

			<Image
				src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/132.svg"
				alt="ditto"
				width={250}
				height={250}
				className={styles.image}
			/>
		</Container>
	);
};
