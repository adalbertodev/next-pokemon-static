import { FC } from "react";

import { Type as PokemonType } from "@/sections/Pokemon";

import { Type } from "../../atoms/Type";
import styles from "./TypeList.module.css";

interface Props {
	types: PokemonType[];

	variant?: "default" | "linked";
}

export const TypeList: FC<Props> = ({ types, variant = "default" }) => {
	return (
		<ul className={styles.type_list}>
			{types.map((type) => (
				<li
					key={type}
					className={`${styles.type_container} ${variant === "linked" ? styles.linked : ""}`}
				>
					<Type type={type} />
				</li>
			))}
		</ul>
	);
};
