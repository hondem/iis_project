import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.space.s10} 0;
  background: ${({ theme }) => theme.colors.white};
  box-sizing: border-box;

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    align-items: center;
    margin: 0;
  }
`;

export const Form = styled.div`
  width: 100%;
  margin: 0 ${({ theme }) => theme.space.s6};

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    width: 360px;
    margin: 0;
  }
`;

export const Separator = styled.div`
  width: 200px;
  height: 1px;
  margin: ${({ theme }) => theme.space.s10} auto;
  background: ${({ theme }) => theme.colors.grays[1]};

  @media (min-width: ${({ theme }) => theme.breakpoints[0]}) {
    width: 300px;
  }
`;
