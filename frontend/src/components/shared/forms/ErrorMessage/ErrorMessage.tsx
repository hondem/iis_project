import React from 'react';
import {
  ErrorMessage as FormikErrorMessage,
  ErrorMessageProps as FormikErrorMessageProps,
} from 'formik';

import * as S from './ErrorMessage.styles';

/* <ErrorMessage />
============================================================================= */
const ErrorMessage: React.FunctionComponent<FormikErrorMessageProps> = props => {
  return (
    <FormikErrorMessage {...props}>
      {message => <S.Wrapper>{message}</S.Wrapper>}
    </FormikErrorMessage>
  );
};

export default ErrorMessage;
