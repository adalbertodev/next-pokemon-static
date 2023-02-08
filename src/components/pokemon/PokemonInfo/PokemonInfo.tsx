import { FC } from "react";

import { SaveFavButton } from "@/components/ui";
import { Pokemon } from "@/sections/Pokemon";

import { PokemonCard } from "../PokemonCard";
import {
	CardContainer,
	Container,
	DataCard,
	DataCardBody,
	DataCardHeader,
	DataContainer,
	SpriteImage,
	SpritesCardBody,
} from "./PokemonInfo.styles";

interface Props {
	pokemon: Pokemon;
}

export const PokemonInfo: FC<Props> = ({ pokemon }) => {
	return (
		<Container>
			<CardContainer>
				<PokemonCard
					pokemon={{
						id: pokemon.id,
						img: pokemon.sprites.default ?? "/no-image.png",
						name: pokemon.name,
					}}
				/>
			</CardContainer>

			<DataContainer>
				<DataCard>
					<DataCardHeader>
						<h1>{pokemon.name}</h1>

						<SaveFavButton>Guardar en Favoritos</SaveFavButton>
					</DataCardHeader>

					<DataCardBody>
						<h3>Sprites:</h3>

						<SpritesCardBody>
							<SpriteImage
								src={
									pokemon.sprites.versions["generation-v"]["black-white"].front_default ??
									"./no-image.png"
								}
								alt={pokemon.name}
							/>

							<SpriteImage
								src={
									pokemon.sprites.versions["generation-v"]["black-white"].back_default ??
									"./no-image.png"
								}
								alt={pokemon.name}
							/>

							<SpriteImage
								src={
									pokemon.sprites.versions["generation-v"]["black-white"].front_shiny ??
									"./no-image.png"
								}
								alt={pokemon.name}
							/>

							<SpriteImage
								src={
									pokemon.sprites.versions["generation-v"]["black-white"].back_shiny ??
									"./no-image.png"
								}
								alt={pokemon.name}
							/>
						</SpritesCardBody>
					</DataCardBody>
				</DataCard>
			</DataContainer>
		</Container>
	);
};
