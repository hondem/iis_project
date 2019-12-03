import styled from 'styled-components';

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: ${({ theme }) => theme.space.s6};

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[2]}) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints[3]}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;
