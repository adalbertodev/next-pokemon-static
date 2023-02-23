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
import { PokemonTypesTableCard } from "../PokemonTypesTableCard";
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

			<Grid xs={12} sm={6}>
				{/* EVOLUCION */}
			</Grid>

			<Grid xs={12}>
				<Card
					title="Debilidades y Fortalezas"
					description={
						<Grid.Container gap={2}>
							<Grid xs={12} md={6}>
								<PokemonTypesTableCard
									title="Defensor"
									damageLabel="Daño recibido"
									rows={[
										{
											damage: "x4",
											types:
												pokemon.type.relations.quadDamageFrom &&
												pokemon.type.relations.quadDamageFrom.length > 0
													? pokemon.type.relations.quadDamageFrom
													: undefined,
										},
										{
											damage: "x2",
											types:
												pokemon.type.relations.doubleDamageFrom.length > 0
													? pokemon.type.relations.doubleDamageFrom
													: undefined,
										},
										{
											damage: "1/2",
											types:
												pokemon.type.relations.halfDamageFrom.length > 0
													? pokemon.type.relations.halfDamageFrom
													: undefined,
										},
										{
											damage: "1/4",
											types:
												pokemon.type.relations.quarterDamageFrom &&
												pokemon.type.relations.quarterDamageFrom.length > 0
													? pokemon.type.relations.quarterDamageFrom
													: undefined,
										},
										{
											damage: "x0",
											types:
												pokemon.type.relations.noDamageFrom.length > 0
													? pokemon.type.relations.noDamageFrom
													: undefined,
										},
									]}
								/>
							</Grid>

							<Grid xs={12} md={6}>
								<PokemonTypesTableCard
									title="Atacante"
									damageLabel="Daño hecho"
									rows={[
										{
											damage: "x2",
											types:
												pokemon.type.relations.doubleDamageTo.length > 0
													? pokemon.type.relations.doubleDamageTo
													: undefined,
										},
										{
											damage: "1/2",
											types:
												pokemon.type.relations.halfDamageTo.length > 0
													? pokemon.type.relations.halfDamageTo
													: undefined,
										},
										{
											damage: "x0",
											types:
												pokemon.type.relations.noDamageTo.length > 0
													? pokemon.type.relations.noDamageTo
													: undefined,
										},
									]}
								/>
							</Grid>
						</Grid.Container>
					}
				/>
			</Grid>

			<Grid xs={12}>
				<PokemonMovesCard moves={pokemon.moves} />
			</Grid>
		</Grid.Container>
	);
};
