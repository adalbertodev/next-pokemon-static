import { Image } from "@nextui-org/react";
import { FC, useMemo } from "react";

import { Card } from "@/components/ui/molecules/Card";
import { PokemonSprites } from "@/sections/Pokemon";

import { SpriteImageContainer, SpriteImagesContainer } from "./PokemonSpritesCard.styles";

interface Props {
	name: string;
	sprites: PokemonSprites;
}

export const PokemonSpritesCard: FC<Props> = ({ name, sprites }) => {
	const orderedSprites = useMemo(
		() => ({
			frontMale: sprites.frontMale,
			backMale: sprites.backMale,
			frontShinyMale: sprites.frontShinyMale,
			backShinyMale: sprites.backShinyMale,
			frontFemale: sprites.frontFemale,
			backFemale: sprites.backFemale,
			frontShinyFemale: sprites.frontShinyFemale,
			backShinyFemale: sprites.backShinyFemale,
		}),
		[sprites]
	);
	const pokemonSprites = useMemo(
		() =>
			Object.entries(orderedSprites)
				.filter((sprite: [string, string | null]) => sprite[0] !== "default")
				.filter((sprite: [string, string | null]): sprite is [string, string] => sprite[1] !== null)
				.map((sprite: [string, string]) => ({
					label: sprite[0],
					img: sprite[1],
				})),
		[orderedSprites]
	);

	return (
		<Card
			title="Sprites"
			description={
				<SpriteImagesContainer>
					{pokemonSprites.map((sprite) => (
						<SpriteImageContainer key={`${name}-spriteimage-${sprite.label}`}>
							<Image src={sprite.img} alt={name} width="100" height="100" />
						</SpriteImageContainer>
					))}
				</SpriteImagesContainer>
			}
		/>
	);
};
