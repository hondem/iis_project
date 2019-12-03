import styled, { css } from 'styled-components';
import { Link } from '../../misc';

export const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0%;
  left: 0%;
  z-index: 1000;
  width: 100%;
  min-height: 60px;
  padding: 0;
  box-shadow: 0px 5px 20px -12px ${({ theme }) => theme.colors.grays[1]};
  background-color: ${({ theme }) => theme.colors.white};
  box-sizing: border-box;

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    min-height: 80px;
  }
`;

export const Logo = styled.a`
  transition: opacity 0.2s ease-out;
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  font-family: 'Lato', sans-serif;
  font-size: 20px;
  color: ${({ theme }) => theme.colors.blues[1]};
  text-decoration: none;
  user-select: none;

  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }

  &:focus {
    outline: none;
    opacity: 0.7;
  }
`;

export const HeaderButton = styled.button<{ borderLeft?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  padding: 0;
  margin: 0;
  appearance: none;
  background: ${({ theme }) => theme.colors.white};
  border: none;

  @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
    width: 80px;
    height: 80px;
  }

  ${({ borderLeft }) =>
    borderLeft
      ? css`
          border-left: 1px solid ${({ theme }) => theme.colors.grays[0]};
        `
      : css`
          border-right: 1px solid ${({ theme }) => theme.colors.grays[0]};
        `};

  &:focus {
    outline: none;
  }

  &:focus,
  &:hover {
    cursor: pointer;

    svg {
      color: ${({ theme }) => theme.colors.blues[1]};
    }
  }

  svg {
    transition: color 0.2s ease-out;
    width: 18px;
    color: ${({ theme }) => theme.colors.grays[1]};

    @media (min-width: ${({ theme }) => theme.breakpoints[1]}) {
      width: 22px;
    }
  }
`;
