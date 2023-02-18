import { Grid, Image } from "@nextui-org/react";
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

export const ImageContainer: FC<CommonProps> = ({ children }) => {
	return (
		<Grid xs={12} sm={4}>
			{children}
		</Grid>
	);
};

export const MainContainer: FC<CommonProps> = ({ children }) => {
	return (
		<Grid xs={12} sm={8}>
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
			{...props}
		/>
	);
};

export const DataCard: FC<CardProps> = ({ css, description, ...props }) => {
	return (
		<Card
			css={{ filter: "none", ...css }}
			description={<Grid.Container>{description}</Grid.Container>}
			{...props}
		/>
	);
};

export const DataCardItemContainer: FC<CommonProps> = ({ children }) => {
	return (
		<Grid
			xs={12}
			sm={6}
			md={4}
			css={{
				display: "flex",
				gap: "var(--nextui-space-4)",

				"& p": {
					letterSpacing: "var(--nextui-letterSpacings-tight)",
				},

				"& p:first-child": {
					color: "var(--nextui-colors-primary)",
					fontWeight: "var(--nextui-fontWeights-bold)",
				},
			}}
		>
			{children}
		</Grid>
	);
};

export const SpritesContainer: FC<CommonProps> = ({ children }) => {
	return <Grid xs={12}>{children}</Grid>;
};

export const SpritesImagesContainer: FC<CommonProps> = ({ children }) => {
	return (
		<Grid.Container gap={0}>
			{React.Children.map(children, (element, index) => (
				<Grid xs={12} sm={6} md={3} key={`spriteimage-${index}`}>
					{element}
				</Grid>
			))}
		</Grid.Container>
	);
};

export const SpritesCard: FC<CardProps> = ({ ...props }) => {
	return <Card {...props} />;
};

export const MovesContainer: FC<CommonProps> = ({ children }) => {
	return <Grid xs={12}>{children}</Grid>;
};

export const MovesCard: FC<CardProps> = ({ ...props }) => {
	return <Card {...props} />;
};

interface SpriteImageProps {
	src: string;
	alt: string;
}

export const SpriteImage: FC<SpriteImageProps> = ({ src, alt }) => {
	return <Image src={src} alt={alt} width={100} height={100} />;
};
