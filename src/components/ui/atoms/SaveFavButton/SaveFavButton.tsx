import { FC } from "react";

import { Button } from "./SaveFavButton.styles";

interface Props {
	children: React.ReactNode;
}

export const SaveFavButton: FC<Props> = ({ children }) => {
	return <Button>{children}</Button>;
};
