import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  box-shadow: 0px 5px 25px -10px ${({ theme }) => theme.colors.grays[1]};
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: ${({ theme }) => theme.space.s6};
`;

export const Tag = styled.div<{ isBold?: boolean }>`
  padding: ${({ theme }) => theme.space.s2} ${({ theme }) => theme.space.s4};
  margin-right: ${({ theme }) => theme.space.s4};
  border: 1px solid ${({ theme }) => theme.colors.grays[1]};
  border-radius: 4px;

  ${({ isBold }) =>
    isBold &&
    css`
      background: ${({ theme }) => theme.colors.grays[0]};
      font-weight: bold;
    `};

  &:last-child {
    margin-right: 0;
  }
`;

export const Footer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1px;
  border-top: 1px solid ${({ theme }) => theme.colors.grays[1]};
  background: ${({ theme }) => theme.colors.grays[1]};
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

export const FooterButton = styled.button<{ isRed?: boolean }>`
  transition: 0.2s background ease-out, 0.2s color ease-out, 0.2s box-shadow ease-out 0.05s;
  flex: 1;
  height: 50px;
  appearance: none;
  border: none;
  background: ${({ theme }) => theme.colors.white};

  &:focus,
  &:hover {
    cursor: pointer;
    outline: none;
    color: ${({ theme }) => theme.colors.white};
    background: ${({ theme }) => theme.colors.blues[1]};
    box-shadow: 0px 10px 30px -15px ${({ theme }) => theme.colors.blues[1]};
  }

  &:first-child {
    border-bottom-left-radius: 4px;
  }

  &:last-child {
    border-bottom-right-radius: 4px;
  }

  ${({ isRed }) =>
    isRed &&
    css`
      &:focus,
      &:hover {
        background: ${({ theme }) => theme.colors.reds[1]};
        box-shadow: 0px 10px 30px -15px ${({ theme }) => theme.colors.reds[1]};
      }
    `}
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  z-index: 10;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
`;

export const OverlayCloseButton = styled.button`
  position: absolute;
  top: ${({ theme }) => theme.space.s6};
  right: ${({ theme }) => theme.space.s6};
  background: none;
  border: none;
  appearance: none;

  &:focus,
  &:hover {
    cursor: pointer;
    outline: none;

    svg {
      color: ${({ theme }) => theme.colors.blues[1]};
    }
  }

  svg {
    transition: color 0.2s ease-out;
    color: ${({ theme }) => theme.colors.grays[1]};
  }
`;
