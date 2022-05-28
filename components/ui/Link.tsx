import { FC } from 'react';
import NextLink from 'next/link';
import { CSS, Link as LinkUi } from '@nextui-org/react';

interface Props {
  children?: JSX.Element | JSX.Element[];
  css?: CSS;
  href?: string;
  passHref?: boolean;
}

export const Link: FC<Props> = ({ children, css, href, passHref }) => {
  return (
    <NextLink href={href || '/'} passHref={passHref}>
      <LinkUi css={css}>{children}</LinkUi>
    </NextLink>
  );
};
