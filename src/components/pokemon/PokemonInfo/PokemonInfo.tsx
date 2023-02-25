/* eslint-disable @typescript-eslint/no-misused-promises */
import { Grid } from "@nextui-org/react";
import { FC, useCallback, useEffect, useState } from "react";

import { FavButton } from "@/components/ui";
import { Card } from "@/components/ui/molecules/Card";
import { usePokemonFavorite } from "@/hooks";
import { Pokemon } from "@/sections/Pokemon";

import { PokemonFavoriteRepository } from "../../../sections/PokemonFavorite/domain/PokemonFavoriteRepository";
import { PokemonDataCard } from "../PokemonDataCard";
import { PokemonImageCard } from "../PokemonImageCard";
import { PokemonMovesCard } from "../PokemonMovesCard";
import { PokemonSpritesCard } from "../PokemonSpritesCard";
import { PokemonStatsCard } from "../PokemonStatsCard";
import { PokemonTypesCard } from "../PokemonTypesCard";
import styles from "./PokemonInfo.module.css";

interface Props {
	pokemon: Pokemon;
	pokemonFavoriteRepository: PokemonFavoriteRepository;
}

export const PokemonInfo: FC<Props> = ({ pokemon, pokemonFavoriteRepository }) => {
	const { toggleFavorite, existPokemonFavorite } = usePokemonFavorite(pokemonFavoriteRepository);
	const [isFavorite, setIsFavorite] = useState(false);

	const onToggleFavorite = useCallback(async () => {
		await toggleFavorite(pokemon.id);
		setIsFavorite((isFavorite) => !isFavorite);
	}, [pokemon.id, toggleFavorite]);

	useEffect(() => {
		existPokemonFavorite(pokemon.id)
			.then((isFavorite) => {
				setIsFavorite(isFavorite);
			})
			.catch((error: Error) => console.error(error));
	}, [existPokemonFavorite, pokemon.id]);

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
					headerClassName={styles.main_card__title}
					header={
						<>
							<h1>{pokemon.name}</h1>
							<FavButton bordered={!isFavorite} size="md" onPress={onToggleFavorite}>
								{isFavorite ? "Guardado" : "Guardar en Favoritos"}
							</FavButton>
						</>
					}
				>
					<Grid.Container gap={2}>
						<Grid xs={6} sm={7} md={7} lg={6}>
							<PokemonDataCard pokemon={pokemon} />
						</Grid>

						<Grid xs={6} sm={5} md={5} lg={6}>
							<PokemonStatsCard stats={pokemon.stats} />
						</Grid>
					</Grid.Container>
				</Card>
			</Grid>

			<Grid xs={12} sm={6}>
				<PokemonSpritesCard name={pokemon.name} sprites={pokemon.sprites} />
			</Grid>

			<Grid xs={12} sm={6}>
				{/* EVOLUCION */}
			</Grid>

			<Grid xs={12}>
				<Card header="Debilidades y Fortalezas">
					<Grid.Container gap={2}>
						<Grid xs={12} md={6}>
							<PokemonTypesCard
								title="Defensor"
								damageLabel="Daño recibido"
								multipliers={[4, 2, 0.5, 0.25, 0]}
								types={pokemon.type.relations.asDefender}
							/>
						</Grid>

						<Grid xs={12} md={6}>
							<PokemonTypesCard
								title="Atacante"
								damageLabel="Daño hecho"
								multipliers={[2, 0.5, 0]}
								types={pokemon.type.relations.asAttacker}
							/>
						</Grid>
					</Grid.Container>
				</Card>
			</Grid>

			<Grid xs={12}>
				<PokemonMovesCard moves={pokemon.moves} />
			</Grid>
		</Grid.Container>
	);
};
