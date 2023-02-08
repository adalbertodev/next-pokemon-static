import { Card, Container as NextUIContainer, Grid, Image } from "@nextui-org/react";
import { FC } from "react";

interface ContainerProps {
	children: React.ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }) => {
	return (
		<Grid.Container gap={2} css={{ marginTop: "5px" }}>
			{children}
		</Grid.Container>
	);
};

interface CardContainerProps {
	children: React.ReactNode;
}

export const CardContainer: FC<CardContainerProps> = ({ children }) => {
	return (
		<Grid xs={12} sm={4}>
			{children}
		</Grid>
	);
};

interface DataContainerProps {
	children: React.ReactNode;
}

export const DataContainer: FC<DataContainerProps> = ({ children }) => {
	return (
		<Grid xs={12} sm={8}>
			{children}
		</Grid>
	);
};

interface DataCardProps {
	children: React.ReactNode;
}

export const DataCard: FC<DataCardProps> = ({ children }) => {
	return <Card>{children}</Card>;
};

interface DataCardHeaderProps {
	children: React.ReactNode;
}

export const DataCardHeader: FC<DataCardHeaderProps> = ({ children }) => {
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

interface DataCardBodyProps {
	children: React.ReactNode;
}

export const DataCardBody: FC<DataCardBodyProps> = ({ children }) => {
	return (
		<Card.Body css={{ padding: "var(--nextui-space-sm) var(--nextui-space-lg)" }}>
			{children}
		</Card.Body>
	);
};

interface SpritesCardBodyProps {
	children: React.ReactNode;
}

export const SpritesCardBody: FC<SpritesCardBodyProps> = ({ children }) => {
	return (
		<NextUIContainer display="flex" direction="row" gap={0}>
			{children}
		</NextUIContainer>
	);
};

interface SpriteImageProps {
	src: string;
	alt: string;
}

export const SpriteImage: FC<SpriteImageProps> = ({ src, alt }) => {
	return <Image src={src} alt={alt} width={100} height={100} />;
};
