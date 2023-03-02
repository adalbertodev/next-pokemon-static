import { FC } from "react";

import { Type as PokemonType } from "@/sections/Pokemon";

import styles from "./Type.module.css";

interface Props {
	type: PokemonType;
}

export const Type: FC<Props> = ({ type }) => {
	return <span className={`${styles.type} ${styles[type]}`}>{type}</span>;
};
