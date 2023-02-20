import { Grid } from "@nextui-org/react";
import { FC } from "react";

import { SaveFavButton } from "@/components/ui";
import { Card } from "@/components/ui/molecules/Card";
import { Pokemon } from "@/sections/Pokemon";

import { PokemonDataCard } from "../PokemonDataCard";
import { PokemonImageCard } from "../PokemonImageCard";
import { PokemonMovesCard } from "../PokemonMovesCard";
import { PokemonSpritesCard } from "../PokemonSpritesCard";
import { PokemonStatsCard } from "../PokemonStatsCard";
import styles from "./PokemonInfo.module.css";

interface Props {
	pokemon: Pokemon;
}

export const PokemonInfo: FC<Props> = ({ pokemon }) => {
	return (
		<Grid.Container gap={2} className={styles.grid_container}>
			<Grid xs={12} md={3}>
				<PokemonImageCard
					pokemon={{
						id: pokemon.id,
						img: pokemon.sprites.default ?? pokemon.sprites.frontMale ?? "/no-image.png",
						name: pokemon.name,
					}}
				/>
			</Grid>

			<Grid xs={12} md={9}>
				<Card
					titleClass={styles.main_card__title}
					descriptionClass={styles.main_card__description}
					title={
						<>
							<h1>{pokemon.name}</h1>

							<SaveFavButton>Guardar en Favoritos</SaveFavButton>
						</>
					}
					description={
						<Grid.Container gap={2}>
							<Grid xs={6} sm={7} md={7} lg={6}>
								<PokemonDataCard pokemon={pokemon} />
							</Grid>

							<Grid xs={6} sm={5} md={5} lg={6}>
								<PokemonStatsCard stats={pokemon.stats} />
							</Grid>
						</Grid.Container>
					}
				/>
			</Grid>

			<Grid xs={12} sm={6}>
				<PokemonSpritesCard name={pokemon.name} sprites={pokemon.sprites} />
			</Grid>

			<Grid xs={12}>
				<PokemonMovesCard moves={pokemon.moves} />
			</Grid>
		</Grid.Container>
	);
};
