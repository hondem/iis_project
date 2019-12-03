import styled from 'styled-components';
import { MarginProps, margin } from 'styled-system';

import { PanelProps } from './Panel';

export const Wrapper = styled.div<MarginProps>`
  width: 100%;
  align-self: start;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0px 5px 20px -12px ${({ theme }) => theme.colors.grays[1]};

  ${margin}
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  min-height: 60px;
  padding: 0 ${({ theme }) => theme.space.s6};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grays[0]};
  color: ${({ theme }) => theme.colors.grays[2]};
`;

export const Content = styled.div<Pick<PanelProps, 'isPadded'>>`
  width: 100%;
  padding: ${({ isPadded, theme }) => (isPadded ? theme.space.s6 : '0')};
`;
