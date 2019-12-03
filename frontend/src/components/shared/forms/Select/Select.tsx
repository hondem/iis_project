import React, { InputHTMLAttributes } from 'react';
import { useField } from 'formik';
import { pick } from 'ramda';
import { MarginProps } from 'styled-system';
import { SelectOption } from '../../../../types/common';

import * as S from './Select.styles';
import { ArrowDown, AlertCircle, ChevronDown } from 'react-feather';

/* Props - <Select />
============================================================================= */
type Props = {
  options: SelectOption[];
} & InputHTMLAttributes<HTMLSelectElement> &
  MarginProps;

/* <Select />
============================================================================= */
const Select: React.FunctionComponent<Props> = ({ id, name, options, type, ...props }) => {
  const [field, meta] = useField<any>({ id, name, options, type, ...props });
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

  return (
    <S.SelectWrapper hasError={hasError} {...marginProps}>
      <S.Select id={id || name} hasError={hasError} {...props} {...field}>
        <option value="" disabled hidden></option>

        {options.map((option, key) => (
          <option key={key} value={option.value}>
            {option.label}
          </option>
        ))}
      </S.Select>

      {hasError && <S.SelectIconWrapper hasError={hasError}><AlertCircle /></S.SelectIconWrapper>}
      <S.SelectDropdownIconWrapper><ChevronDown /></S.SelectDropdownIconWrapper>
    </S.SelectWrapper>
  );
};

/* Default props - <Select />
============================================================================= */
Select.defaultProps = {
  mb: 's2',
};

export default Select;
