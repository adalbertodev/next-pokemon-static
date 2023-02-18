import { FC } from "react";

import { SaveFavButton } from "@/components/ui";
import { Table } from "@/components/ui/molecules";
import { Pokemon } from "@/sections/Pokemon";

import { PokemonCard } from "../PokemonCard";
import {
	Container,
	DataCard,
	DataCardItemContainer,
	ImageContainer,
	MainCard,
	MainContainer,
	MovesCard,
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
				<MainCard
					title={
						<>
							<h1>{pokemon.name}</h1>

							<SaveFavButton>Guardar en Favoritos</SaveFavButton>
						</>
					}
					description={
						<DataCard
							title="Datos"
							description={
								<>
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
													<abbr key={ability.name} title="Habilidad Oculta">
														{ability.name},{" "}
													</abbr>
												) : (
													<span key={ability.name}>{ability.name}, </span>
												)
											)}
										</p>
									</DataCardItemContainer>
								</>
							}
						/>
					}
				/>
			</MainContainer>

			<MovesContainer>
				<MovesCard
					title="Movimientos"
					description={
						<Table
							columns={[
								{ key: "level", label: "Nivel" },
								{ key: "move", label: "Movimiento" },
								{ key: "type", label: "Tipo" },
								{ key: "damageClass", label: "Clase" },
								{ key: "power", label: "Poder" },
								{ key: "accuracy", label: "Precisión" },
							]}
							rows={pokemon.moves.learnByLevel
								.sort((moveA, moveB) => moveA.learnedLevel - moveB.learnedLevel)
								.map((move) => ({
									move: move.name,
									type: move.type,
									damageClass: move.damageClass ?? "unknown",
									level: move.learnedLevel,
									power: move.power === 0 ? "-" : move.power,
									accuracy: move.accuracy === 0 ? "-" : move.accuracy,
								}))}
						/>
					}
				/>
			</MovesContainer>
		</Container>
	);
};
