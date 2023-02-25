import { Button, ButtonProps as NextUIButtonProps } from "@nextui-org/react";
import { FC } from "react";

interface Props {
	children: React.ReactNode;
}

export const FavButton: FC<Props & NextUIButtonProps> = ({ children, ...props }) => {
	return (
		<Button color="gradient" {...props}>
			{children}
		</Button>
	);
};
