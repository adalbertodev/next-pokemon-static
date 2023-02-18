import { Card as NextUICard, Text } from "@nextui-org/react";
import { FC } from "react";

// CARD
interface CardProps {
	children: React.ReactNode;
	variant: "default" | "withName";
	onClick: () => void;
}

export const Card: FC<CardProps> = ({ children, variant, onClick }) => {
	return (
		<NextUICard
			isHoverable
			isPressable={variant === "withName"}
			onClick={onClick}
			css={{ padding: variant === "withName" ? "0" : "var(--nextui-space-lg)" }}
		>
			{children}
		</NextUICard>
	);
};

// CARD BODY
interface CardBodyProps {
	children: React.ReactNode;
}

export const CardBody: FC<CardBodyProps> = ({ children }) => {
	return (
		<NextUICard.Body
			css={{
				justifyContent: "center",
				padding: "var(--nextui-space-1)",
				paddingTop: "var(--nextui-space-7)",
			}}
		>
			{children}
		</NextUICard.Body>
	);
};

// CARD IMAGE
interface CardImageProps {
	src: string;
	alt: string;
}

export const CardImage: FC<CardImageProps> = ({ src, alt }) => {
	return (
		<NextUICard.Image
			src={src}
			alt={alt}
			width="100%"
			// height={variant === "withName" ? 140 : 200}
			style={{
				aspectRatio: "2/1",
				objectFit: "contain",
			}}
		/>
	);
};

// CARD FOOTER
interface CardFooterProps {
	children: React.ReactNode;
}

export const CardFooter: FC<CardFooterProps> = ({ children }) => {
	return (
		<NextUICard.Footer
			css={{
				justifyContent: "space-between",
			}}
		>
			{children}
		</NextUICard.Footer>
	);
};

// CARD NAME
interface CardNameProps {
	children: React.ReactNode;
}

export const CardName: FC<CardNameProps> = ({ children }) => {
	return (
		<Text
			transform="capitalize"
			css={{
				fontWeight: "bold",
				letterSpacing: "var(--nextui-letterSpacings-normal)",
			}}
		>
			{children}
		</Text>
	);
};
