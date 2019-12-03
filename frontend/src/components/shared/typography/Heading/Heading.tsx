import {
  SpaceProps,
  TypographyProps,
  ColorProps,
  space,
  typography,
  color,
  compose,
} from 'styled-system';
import styled from 'styled-components';

/* <Heading />
============================================================================= */
const Heading = styled.h1<SpaceProps & TypographyProps & ColorProps>(
  {
    fontFamily: "'Lato', sans-serif",
  },
  compose(
    color,
    space,
    typography,
  ),
);

/* Default props - <Heading />
============================================================================= */
Heading.defaultProps = {
  mt: 0,
  mb: 's6',
};

export default Heading;
