import React from 'react';
import NextLink, { LinkProps } from 'next/link';
import { ColorProps } from 'styled-system';
import { pick } from 'ramda';

import * as S from './Link.styles';

/* Props - <Link />
============================================================================= */
type Props = LinkProps & ColorProps;

/* <Link />
============================================================================= */
const Link: React.FunctionComponent<Props> = ({
  href,
  as,
  replace,
  scroll,
  shallow,
  passHref,
  prefetch,
  children,
  ...props
}) => {
  return (
    <NextLink
      href={href}
      as={as}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref={passHref}
      prefetch={prefetch}
    >
      <S.Link {...props}>{children}</S.Link>
    </NextLink>
  );
};

/* <Link />
============================================================================= */
Link.defaultProps = {
  color: 'blues.1'
}

export default Link;
