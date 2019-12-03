import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: ${({ theme }) => theme.space.s10} 0;

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    flex-direction: row;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.blues[1]};
  box-shadow: 0px 5px 15px -4px ${({ theme }) => theme.colors.blues[1]};
  border-radius: 4px;

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    width: 60px;
    height: 60px;
    box-shadow: 0px 5px 22px -2px ${({ theme }) => theme.colors.blues[1]};

    svg {
      width: 24px;
      height: 24px;
    }
  }

  svg {
    color: ${({ theme }) => theme.colors.white};
    width: 20px;
    height: 20px;
  }
`;
