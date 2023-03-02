import { Card as NextUICard, CardProps as NextUICardProps } from "@nextui-org/react";
import { FC, useMemo } from "react";

import styles from "./Card.module.css";

export interface CardProps {
	header?: React.ReactNode;
	footer?: React.ReactNode;
	children: React.ReactNode;

	className?: string;
	headerClassName?: string;
	bodyClassName?: string;
	footerClassName?: string;
}

export const Card: FC<NextUICardProps & CardProps> = ({
	header: title,
	footer,
	children,
	className,
	headerClassName,
	bodyClassName,
	footerClassName,
	...props
}) => {
	const renderTitle = useMemo(
		() => (typeof title === "string" ? <h3>{title}</h3> : title),
		[title]
	);

	return (
		<NextUICard className={`${styles.card} ${className ? className : ""}`} {...props}>
			{renderTitle && (
				<NextUICard.Header className={headerClassName}>{renderTitle}</NextUICard.Header>
			)}

			<NextUICard.Body className={`${styles.card_body} ${bodyClassName ? bodyClassName : ""}`}>
				{children}
			</NextUICard.Body>

			{footer && <NextUICard.Footer className={footerClassName}>{footer}</NextUICard.Footer>}
		</NextUICard>
	);
};
