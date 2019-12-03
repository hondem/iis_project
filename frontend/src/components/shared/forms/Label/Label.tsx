import React, { LabelHTMLAttributes } from 'react';

import * as S from './Label.styles';
import { MarginProps } from 'styled-system';

/* Props - <Label />
============================================================================= */
export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & MarginProps;

/* <Label />
============================================================================= */
const Label: React.FunctionComponent<LabelProps> = ({ children, ...props }) => {

  return (
    <>
      <S.Label {...props}>
        {children}
      </S.Label>
    </>
  );
};

/* Default props - <Label />
============================================================================= */
Label.defaultProps = {
  mb: 's3',
};

export default Label;
