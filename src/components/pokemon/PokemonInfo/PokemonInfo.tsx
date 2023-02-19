import { FC } from "react";

import { SaveFavButton } from "@/components/ui";
import { Pokemon } from "@/sections/Pokemon";

import { PokemonCard } from "../PokemonCard";
import { PokemonDataCard } from "../PokemonDataCard";
import { PokemonMovesCard } from "../PokemonMovesCard";
import { PokemonSpritesCard } from "../PokemonSpritesCard";
import { PokemonStatsCard } from "../PokemonStatsCard";
import {
	Container,
	MainCard,
	MainCardContainer,
	MainCardSection,
	MainContainer,
	MovesContainer,
	PokemonImageContainer,
	SpritesContainer,
} from "./PokemonInfo.styles";

interface Props {
	pokemon: Pokemon;
}

export const PokemonInfo: FC<Props> = ({ pokemon }) => {
	return (
		<Container>
			<PokemonImageContainer>
				<PokemonCard
					pokemon={{
						id: pokemon.id,
						img: pokemon.sprites.default ?? "/no-image.png",
						name: pokemon.name,
					}}
				/>
			</PokemonImageContainer>

			<MainContainer>
				<MainCard
					title={
						<>
							<h1>{pokemon.name}</h1>

							<SaveFavButton>Guardar en Favoritos</SaveFavButton>
						</>
					}
					description={
						<MainCardContainer>
							<MainCardSection>
								<PokemonDataCard pokemon={pokemon} />
							</MainCardSection>

							<MainCardSection>
								<PokemonStatsCard stats={pokemon.stats} />
							</MainCardSection>
						</MainCardContainer>
					}
				/>
			</MainContainer>

			<SpritesContainer>
				<PokemonSpritesCard name={pokemon.name} sprites={pokemon.sprites} />
			</SpritesContainer>

			<MovesContainer>
				<PokemonMovesCard moves={pokemon.moves} />
			</MovesContainer>
		</Container>
	);
};
