import { Grid } from "@nextui-org/react";
import React, { FC } from "react";

import { Card, CardProps } from "@/components/ui/molecules/Card";

interface CommonProps {
	children: string | JSX.Element | JSX.Element[];
}

export const Container: FC<CommonProps> = ({ children }) => {
	return (
		<Grid.Container
			gap={2}
			css={{
				width: "100%",
				margin: 0,

				"& abbr": {
					textDecoration: "dotted underline var(--nextui-colors-accents8) 2px",
				},
			}}
		>
			{children}
		</Grid.Container>
	);
};

export const PokemonImageContainer: FC<CommonProps> = ({ children }) => {
	return (
		<Grid xs={12} sm={4} lg={3}>
			{children}
		</Grid>
	);
};

export const MainContainer: FC<CommonProps> = ({ children }) => {
	return (
		<Grid xs={12} sm={8} lg={9}>
			{children}
		</Grid>
	);
};

export const MainCard: FC<CardProps> = ({ titleCSS, ...props }) => {
	return (
		<Card
			titleCSS={{
				display: "flex",
				justifyContent: "space-between",

				"& h1": {
					textTransform: "capitalize",
				},
				...titleCSS,
			}}
			descriptionCSS={{
				"& div[role=section]": {
					filter: "none",
				},
			}}
			{...props}
		/>
	);
};

export const MainCardContainer: FC<CommonProps> = ({ children }) => {
	return <Grid.Container gap={2}>{children}</Grid.Container>;
};

export const MainCardSection: FC<CommonProps> = ({ children }) => {
	return (
		<Grid xs={12} sm={6}>
			{children}
		</Grid>
	);
};

export const SpritesContainer: FC<CommonProps> = ({ children }) => {
	return (
		<Grid xs={12} sm={6}>
			{children}
		</Grid>
	);
};

export const MovesContainer: FC<CommonProps> = ({ children }) => {
	return <Grid xs={12}>{children}</Grid>;
};
