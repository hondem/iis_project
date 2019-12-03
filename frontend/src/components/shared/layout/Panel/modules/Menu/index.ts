import styled, { css } from 'styled-components';
import { Link } from '../../../../misc';

export const Menu = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
`;

export const MenuItem = styled.li`
  display: flex;
  align-items: center;
  padding: 0 ${({ theme }) => theme.space.s6} ${({ theme }) => theme.space.s6};

  :first-child {
    padding-top: ${({ theme }) => theme.space.s6};
  }
`;

export const MenuLink = styled.a<{ isActive: boolean }>`
  transition: color 0.2s ease-out;
  position: relative;
  font-weight: bold;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.grays[3]};

  :focus,
  :hover {
    color: ${({ theme }) => theme.colors.blues[1]};
    outline: none;
  }

  ${({ isActive }) =>
    isActive &&
    css`
      padding-left: ${({ theme }) => theme.space.s10};
      color: ${({ theme }) => theme.colors.blues[1]};

      ::before {
        content: '';
        transform: translateY(-50%);
        position: absolute;
        top: 50%;
        left: 0;
        width: 20px;
        height: 4px;
        background: ${({ theme }) => theme.colors.blues[1]};
        border-radius: 2px;
      }
    `}
`;
