import { Card, Grid, Image } from "@nextui-org/react";
import { FC } from "react";

interface CommonProps {
	children: React.ReactNode;
}

export const Container: FC<CommonProps> = ({ children }) => {
	return (
		<Grid.Container gap={2} css={{ width: "100%", margin: 0 }}>
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

export const MainCard: FC<CommonProps> = ({ children }) => {
	return <Card>{children}</Card>;
};

export const MainCardHeader: FC<CommonProps> = ({ children }) => {
	return (
		<Card.Header
			css={{
				display: "flex",
				justifyContent: "space-between",

				"& h1": {
					textTransform: "capitalize",
				},
			}}
		>
			{children}
		</Card.Header>
	);
};

export const MainCardBody: FC<CommonProps> = ({ children }) => {
	return (
		<Card.Body css={{ padding: "var(--nextui-space-sm) var(--nextui-space-lg)" }}>
			{children}
		</Card.Body>
	);
};

export const DataCard: FC<CommonProps> = ({ children }) => {
	return <Card css={{ filter: "none" }}>{children}</Card>;
};

export const DataCardHeader: FC<CommonProps> = ({ children }) => {
	return <Card.Header>{children}</Card.Header>;
};

export const DataCardBody: FC<CommonProps> = ({ children }) => {
	return (
		<Card.Body css={{ padding: "var(--nextui-space-sm) var(--nextui-space-lg)" }}>
			<Grid.Container>{children}</Grid.Container>
		</Card.Body>
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

export const MovesContainer: FC<CommonProps> = ({ children }) => {
	return <Grid xs={12}>{children}</Grid>;
};

export const MovesCard: FC<CommonProps> = ({ children }) => {
	return <Card>{children}</Card>;
};

export const MovesCardHeader: FC<CommonProps> = ({ children }) => {
	return <Card.Header>{children}</Card.Header>;
};

export const MovesCardBody: FC<CommonProps> = ({ children }) => {
	return (
		<Card.Body css={{ padding: "var(--nextui-space-sm) var(--nextui-space-lg)" }}>
			{children}
		</Card.Body>
	);
};

interface SpriteImageProps {
	src: string;
	alt: string;
}

export const SpriteImage: FC<SpriteImageProps> = ({ src, alt }) => {
	return <Image src={src} alt={alt} width={100} height={100} />;
};
