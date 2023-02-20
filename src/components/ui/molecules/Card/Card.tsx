import { Card as NextUICard } from "@nextui-org/react";
import { FC, useMemo } from "react";

import styles from "./Card.module.css";

export interface CardProps {
	className?: string;

	title?: React.ReactNode;
	titleClass?: string;

	description: React.ReactNode;
	descriptionClass?: string;
}

export const Card: FC<CardProps> = ({
	className,
	title,
	titleClass,
	description,
	descriptionClass,
}) => {
	const renderTitle = useMemo(
		() => (typeof title === "string" ? <h3>{title}</h3> : title),
		[title]
	);

	return (
		<NextUICard className={className}>
			<NextUICard.Header className={titleClass}>{renderTitle}</NextUICard.Header>

			<NextUICard.Body
				className={`${styles.card_body} ${descriptionClass ? descriptionClass : ""}`}
			>
				{description}
			</NextUICard.Body>
		</NextUICard>
	);
};
