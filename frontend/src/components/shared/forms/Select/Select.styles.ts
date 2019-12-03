import styled, { css } from 'styled-components';
import { InputHTMLAttributes } from 'react';
import { MarginProps, margin } from 'styled-system';

export const Select = styled.select<{ hasError: boolean } & InputHTMLAttributes<HTMLSelectElement>>`
  transition: all 0.2s ease-out;
  flex: 1;
  width: 100%;
  min-height: 50px;
  padding: 0 ${({ theme }) => theme.space.s4};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.grays[3]};
  border: none;
  border-radius: 4px;
  background: ${({ theme }) => theme.colors.white};
  appearance: none;

  ${({ hasError }) =>
    hasError &&
    css`
      border-color: ${({ theme }) => theme.colors.reds[1]};
      box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.reds[1]};
    `}

  &:focus {
    border-color: ${({ theme }) => theme.colors.blues[1]};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.blues[1]};
    outline: none;
  }
`;

export const SelectWrapper = styled.div<{ hasError: boolean } & MarginProps>`
  transition: all 0.2s ease-out;
  display: flex;
  position: relative;
  width: 100%;
  min-height: 50px;
  border: 1px solid ${({ theme }) => theme.colors.grays[1]};
  border-radius: 4px;
  box-sizing: border-box;

  ${margin}
`;

export const SelectIconWrapper = styled.div<{ hasError: boolean }>`
  transform: translateY(-50%);
  display: none;
  position: absolute;
  top: 50%;
  right: ${({ theme }) => theme.space.s12};
  width: 20px;
  height: 20px;
  pointer-events: none;

  ${({ hasError }) =>
    hasError &&
    css`
      display: block;
    `}

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.reds[1]};
  }
`;

export const SelectDropdownIconWrapper = styled.div`
  transform: translateY(-50%);
  position: absolute;
  top: 50%;
  right: ${({ theme }) => theme.space.s4};
  width: 20px;
  height: 20px;
  pointer-events: none;

  svg {
    width: 20px;
    height: 20px;
    color: ${({ theme }) => theme.colors.grays[3]};
  }
`;