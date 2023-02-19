import { FC } from "react";

import { Type as PokemonType } from "@/sections/Pokemon";

import { Type } from "../../atoms/Type";
import styles from "./TypeList.module.css";

interface Props {
	types: PokemonType[];
}

export const TypeList: FC<Props> = ({ types }) => {
	return (
		<ul className={styles.type_list}>
			{types.map((type) => (
				<li key={type} className={styles.type_container}>
					<Type type={type} />
				</li>
			))}
		</ul>
	);
};
