import { FC } from "react";

import { DamageClass as PokemonDamageClass } from "@/sections/Pokemon";

import styles from "./DamageClass.module.css";

interface Props {
	damageClass: PokemonDamageClass;
}

export const DamageClass: FC<Props> = ({ damageClass }) => {
	return (
		<div
			title={`Clase ${damageClass}`}
			className={`${styles.damage_class} ${styles[damageClass]}`}
		></div>
	);
};
