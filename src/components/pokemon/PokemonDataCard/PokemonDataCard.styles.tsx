import { Grid } from "@nextui-org/react";
import { FC } from "react";

interface CommonProps {
	children: string | JSX.Element | JSX.Element[];
}

export const DataContainer: FC<CommonProps> = ({ children }) => {
	return (
		<Grid.Container css={{ height: "100%", display: "flex", alignItems: "center" }}>
			{children}
		</Grid.Container>
	);
};

export const DataItem: FC<CommonProps> = ({ children }) => {
	return (
		<Grid
			xs={12}
			sm={6}
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

				"& > div": {
					display: "flex",
					alignItems: "center",
				},
			}}
		>
			{children}
		</Grid>
	);
};
