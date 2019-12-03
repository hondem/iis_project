import styled from 'styled-components';

import { AlertProps } from './Alert';
import { margin } from 'styled-system';

const getTypeColor = ({ type, theme }: AlertProps & { theme: any }) => {
  let backgroundColor;

  /* Get background color according to the active type */
  switch (type) {
    case 'success':
      backgroundColor = theme.colors.greens[1];
      break;
    case 'error':
      backgroundColor = theme.colors.reds[1];
      break;
    case 'warning':
      backgroundColor = theme.colors.yellows[1];
      break;
    case 'info':
    default:
      backgroundColor = theme.colors.blues[1];
  }

  return backgroundColor;
};

export const Wrapper = styled.div<Pick<AlertProps, 'type'>>`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
  width: 100%;
  padding: ${({ theme }) => theme.space.s4} ${({ theme }) => theme.space.s6};
  border: 1px solid ${({ theme }) => theme.colors.grays[0]};
  box-shadow: 0px 8px 30px -15px ${({ theme }) => theme.colors.grays[1]};
  background: ${({ theme }) => theme.colors.white};
  border-radius: 4px;
  box-sizing: border-box;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background-color: ${getTypeColor};
  }

  ${margin}
`;

export const Icon = styled.div<Pick<AlertProps, 'type'>>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  min-width: 24px;
  height: 24px;
  border-radius: 12px;
  background-color: ${getTypeColor};
  color: ${({ theme }) => theme.colors.white};
`;