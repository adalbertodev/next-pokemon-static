import { Grid } from "@nextui-org/react";
import React, { FC } from "react";

interface CommonProps {
	children: string | JSX.Element | JSX.Element[];
}

export const SpriteImagesContainer: FC<CommonProps> = ({ children }) => {
	return <Grid.Container gap={0}>{children}</Grid.Container>;
};

export const SpriteImageContainer: FC<CommonProps> = ({ children }) => {
	return (
		<Grid xs={6} sm={3}>
			{children}
		</Grid>
	);
};
