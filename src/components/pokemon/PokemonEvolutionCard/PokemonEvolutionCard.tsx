import { Grid, Image } from "@nextui-org/react";
import Link from "next/link";
import { FC } from "react";

import { Card } from "@/components/ui/molecules/Card";
import { PokemonEvolution } from "@/sections/Pokemon";
import { capitalize } from "@/utils";

import styles from "./PokemonEvolutionCard.module.css";

interface Props {
	evolution: PokemonEvolution;
}

export const PokemonEvolutionCard: FC<Props> = ({ evolution }) => {
	return (
		<Card header="Evolución">
			<Grid.Container gap={0} className={styles.container}>
				{evolution.evolutionChain.map((evolutionStep, index, evolutionSteps) => (
					<Grid xs={12} sm={12 / evolutionSteps.length} key={`evolutionStep-${index}`}>
						<Grid.Container gap={0} className={styles.evolution__container}>
							{evolutionStep.pokemons.map(({ img, name }, _, pokemons) => (
								<Grid
									{...(pokemons.length > 3
										? {
												xs: Math.max(12 / pokemons.length, 4),
												md: Math.max(12 / pokemons.length, 6),
												lg: Math.max(12 / pokemons.length, 4),
										  }
										: { xs: 12 })}
									key={name}
									className={styles.evolution__pokemon}
								>
									<Link href={`/pokemon/${name}`} className={styles.evolution__pokemon_link}>
										<Image src={img} alt={name} width={120} height={120} />

										<p className={styles.evolution__pokemon_name}>{capitalize(name)}</p>
									</Link>
								</Grid>
							))}
						</Grid.Container>
					</Grid>
				))}
			</Grid.Container>
		</Card>
	);
};
