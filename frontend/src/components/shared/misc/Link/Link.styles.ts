import styled from 'styled-components';
import { color, ColorProps } from 'styled-system';
import { AnchorHTMLAttributes } from 'react';

export const Link = styled.a<ColorProps & any>`
  transition: all 0.2s ease-out;
  text-decoration: none;

  &:hover,
  &:focus {
    cursor: pointer;
    text-decoration: underline;
    outline: none;
  }

  ${color}
`;
