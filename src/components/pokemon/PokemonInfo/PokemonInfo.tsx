import { FC } from "react";

import { SaveFavButton } from "@/components/ui";
import { Pokemon } from "@/sections/Pokemon";

import { PokemonCard } from "../PokemonCard";
import {
	Container,
	DataCard,
	DataCardBody,
	DataCardHeader,
	DataCardItemContainer,
	ImageContainer,
	MainCard,
	MainCardBody,
	MainCardHeader,
	MainContainer,
	MovesCard,
	MovesCardBody,
	MovesCardHeader,
	MovesContainer,
} from "./PokemonInfo.styles";

interface Props {
	pokemon: Pokemon;
}

export const PokemonInfo: FC<Props> = ({ pokemon }) => {
	return (
		<Container>
			<ImageContainer>
				<PokemonCard
					pokemon={{
						id: pokemon.id,
						img: pokemon.sprites.default ?? "/no-image.png",
						name: pokemon.name,
					}}
				/>
			</ImageContainer>

			<MainContainer>
				<MainCard>
					<MainCardHeader>
						<h1>{pokemon.name}</h1>

						<SaveFavButton>Guardar en Favoritos</SaveFavButton>
					</MainCardHeader>

					<MainCardBody>
						<DataCard>
							<DataCardHeader>
								<h3>Datos:</h3>
							</DataCardHeader>

							<DataCardBody>
								<DataCardItemContainer>
									<p>Pokédex Nacional: </p>
									<p>#{pokemon.id}</p>
								</DataCardItemContainer>

								<DataCardItemContainer>
									<p>Peso: </p>
									<p>{pokemon.weight} kg</p>
								</DataCardItemContainer>

								<DataCardItemContainer>
									<p>Altura: </p>
									<p>{pokemon.height} m</p>
								</DataCardItemContainer>

								<DataCardItemContainer>
									<p>Tipos: </p>
									<p>
										{pokemon.types.map((type) => (
											<span key={type.name}>{type.name}, </span>
										))}
									</p>
								</DataCardItemContainer>

								<DataCardItemContainer>
									<p>Habilidad: </p>
									<p>
										{pokemon.abilities.map((ability) =>
											ability.isHidden ? (
												<strong key={ability.name}>{ability.name}, </strong>
											) : (
												<span key={ability.name}>{ability.name}, </span>
											)
										)}
									</p>
								</DataCardItemContainer>
							</DataCardBody>
						</DataCard>
					</MainCardBody>
				</MainCard>
			</MainContainer>

			<MovesContainer>
				<MovesCard>
					<MovesCardHeader>
						<h3>Movimientos</h3>
					</MovesCardHeader>

					<MovesCardBody>
						{pokemon.moves.learnedByLevel.map((move) => (
							<p key={move.name}>
								{move.name} {move.versionDetails[1].learnedLevel} {move.versionDetails[1].version}
							</p>
						))}
					</MovesCardBody>
				</MovesCard>
			</MovesContainer>
		</Container>
	);
};
