import { Button as NextUIButton } from "@nextui-org/react";
import { FC } from "react";

interface ButtonProps {
	children: React.ReactNode;
}

export const Button: FC<ButtonProps> = ({ children }) => {
	return (
		<NextUIButton color="gradient" ghost>
			{children}
		</NextUIButton>
	);
};
