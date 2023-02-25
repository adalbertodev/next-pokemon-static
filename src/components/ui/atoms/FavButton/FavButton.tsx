import { Button } from "@nextui-org/react";
import { FC } from "react";

interface Props {
	auto?: boolean;
	children: React.ReactNode;
	ghost?: boolean;
	size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const FavButton: FC<Props> = ({ auto, children, ghost, size }) => {
	return (
		<Button auto={auto} color="gradient" ghost={ghost} size={size}>
			{children}
		</Button>
	);
};
