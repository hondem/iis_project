import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import { pick } from 'ramda';
import { MarginProps } from 'styled-system';
import { AlertCircle } from 'react-feather';

import * as S from './Input.styles';

/* Props - <Input />
============================================================================= */
type Props = InputHTMLAttributes<HTMLInputElement> & MarginProps;

/* <Input />
============================================================================= */
const Input: React.FunctionComponent<Props> = ({ id, name, type, ...props }) => {
  const [field, meta] = useField<any>({ id, name, type, ...props });
  const hasError = !!meta.error && !!meta.touched;

  /* Separate margin props */
  const marginProps = pick([
    'm',
    'margin',
    'mt',
    'marginTop',
    'mb',
    'marginBottom',
    'ml',
    'marginLeft',
    'mr',
    'marginRight',
    'my',
    'mx',
  ])(props);

  /* Checkbox variant */
  if (type === 'checkbox') {
    return (
      <S.CheckboxWrapper {...marginProps}>
        <S.CheckboxInput id={id || name} type={type} {...props} {...field} />
        <S.CheckboxCheckmark hasError={hasError} checked={field.checked} />
      </S.CheckboxWrapper>
    );
  }

  return (
    <S.InputWrapper hasError={hasError} {...marginProps}>
      <S.Input id={id || name} type={type} hasError={hasError} {...props} {...field} />
      {hasError && <S.InputIconWrapper hasError={hasError}><AlertCircle /></S.InputIconWrapper>}
    </S.InputWrapper>
  );
};

/* Default props - <Input />
============================================================================= */
Input.defaultProps = {
  type: 'text',
  mb: 's2',
};

export default Input;
