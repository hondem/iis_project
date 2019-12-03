import styled from 'styled-components';
import { margin } from 'styled-system';

import { LabelProps } from './Label';

export const Label = styled.label<LabelProps>`
  display: block;
  color: ${({ theme }) => theme.colors.grays[3]};

  ${margin}
`;