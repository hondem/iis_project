import styled from 'styled-components';

/* Props - <Content />
============================================================================= */
type Props = {
  isNarrow?: boolean;
};

/* <Content />
============================================================================= */
const Content = styled.div<Props>`
  width: 100%;
  max-width: ${({ isNarrow }) => (isNarrow ? '1400px' : '100%')};
  padding: 0 ${({ theme }) => theme.space.s6};
  margin: 60px auto 0 auto;

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    margin: 80px auto 0 auto;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[4]}) {
    padding: 0 ${({ theme }) => theme.space.s20};
  }
`;

/* Default props - <Content />
============================================================================= */
Content.defaultProps = {
  isNarrow: false,
};

export default Content;
