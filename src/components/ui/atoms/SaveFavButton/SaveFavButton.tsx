import { Button } from "@nextui-org/react";
import { FC } from "react";

interface Props {
	children: React.ReactNode;
}

export const SaveFavButton: FC<Props> = ({ children }) => {
	return (
		<Button color="gradient" ghost>
			{children}
		</Button>
	);
};
