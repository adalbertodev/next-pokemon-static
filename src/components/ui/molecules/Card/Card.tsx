import { CSS } from "@nextui-org/react";
import { FC, useMemo } from "react";

import { Card as StyledCard, CardBody, CardHeader } from "./Card.styles";

export interface CardProps {
	css?: CSS;

	title: React.ReactNode | string;
	titleCSS?: CSS;

	description: React.ReactNode;
	descriptionCSS?: CSS;
}

export const Card: FC<CardProps> = ({ css, title, titleCSS, description, descriptionCSS }) => {
	const renderTitle = useMemo(
		() => (typeof title === "string" ? <h3>{title}</h3> : title),
		[title]
	);

	return (
		<StyledCard css={css}>
			<CardHeader css={titleCSS}>{renderTitle}</CardHeader>

			<CardBody css={descriptionCSS}>{description}</CardBody>
		</StyledCard>
	);
};
