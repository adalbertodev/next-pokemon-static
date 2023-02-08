import { Grid } from "@nextui-org/react";
import { FC } from "react";

interface ContainerProps {
	children: React.ReactNode;
}

export const Container: FC<ContainerProps> = ({ children }) => {
	return (
		<Grid.Container
			justify="flex-start"
			gap={2}
			css={{
				margin: 0,
				width: "100%",
			}}
		>
			{children}
		</Grid.Container>
	);
};

interface CardContainerProps {
	children: React.ReactNode;
}

export const CardContainer: FC<CardContainerProps> = ({ children }) => {
	return (
		<Grid xs={6} sm={4} md={2} xl={1.2}>
			{children}
		</Grid>
	);
};
