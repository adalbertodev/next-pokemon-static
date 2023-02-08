import { FC } from "react";

import { PokemonItem } from "@/sections/PokemonList";

import { PokemonCard } from "../PokemonCard/PokemonCard";
import { CardContainer, Container } from "./PokemonCardList.styles";

interface Props {
	pokemons: PokemonItem[];
}

export const PokemonCardList: FC<Props> = ({ pokemons }) => {
	return (
		<Container>
			{pokemons.map((pokemon) => (
				<CardContainer key={pokemon.id}>
					<PokemonCard pokemon={pokemon} variant="withName" />
				</CardContainer>
			))}
		</Container>
	);
};
