import { Button } from "@nextui-org/react";

import styles from "./Home.module.css";

export const Home = () => {
	return (
		<main className={styles.main}>
			<Button color="gradient">Hola Mundo</Button>
		</main>
	);
};
