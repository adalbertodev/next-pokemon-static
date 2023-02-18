import { Card as NextUICard, CSS } from "@nextui-org/react";
import { FC } from "react";

interface CommonProps {
	children: React.ReactNode;
	css?: CSS;
}

export const Card: FC<CommonProps> = ({ children, css }) => {
	return <NextUICard css={css}>{children}</NextUICard>;
};

export const CardHeader: FC<CommonProps> = ({ children, css }) => {
	return <NextUICard.Header css={css}>{children}</NextUICard.Header>;
};

export const CardBody: FC<CommonProps> = ({ children, css }) => {
	return (
		<NextUICard.Body
			css={{
				padding: "var(--nextui-space-sm) var(--nextui-space-lg)",
				...css,
			}}
		>
			{children}
		</NextUICard.Body>
	);
};
