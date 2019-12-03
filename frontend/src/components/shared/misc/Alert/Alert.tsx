import React from 'react';
import { MarginProps } from 'styled-system';

import * as S from './Alert.styles';
import { Check, AlertTriangle } from 'react-feather';
import { Flex } from '../../layout';
import { Paragraph } from '../../typography';

/* Props - <Alert />
============================================================================= */
export type AlertType = 'info' | 'success' | 'error' | 'warning';

export type AlertProps = {
  type?: AlertType;
} & MarginProps;

/* <Alert />
============================================================================= */
const Alert: React.FunctionComponent<AlertProps> = ({ type, children, ...props }) => {
  /* Get Alert icon by it's type */
  const getIconByType = () => {
    switch (type) {
      case 'success':
        return <Check size="16" />;
      case 'error':
        return '!';
      case 'warning':
        return '!';
      case 'info':
      default:
        return 'i';
    }
  };

  /* Get Alert title by it's type */
  const getTitleByType = () => {
    switch (type) {
      case 'success':
        return 'Úspech';
      case 'error':
        return 'Chyba';
      case 'warning':
        return 'Varovanie';
      case 'info':
      default:
        return 'Info';
    }
  };

  return (
    <S.Wrapper type={type} {...props}>
      <S.Icon type={type}>{getIconByType()}</S.Icon>

      <Flex flexDirection="column" ml="s4">
        <Paragraph mb="s1" fontWeight="bold">
          {getTitleByType()}
        </Paragraph>
        {children}
      </Flex>
    </S.Wrapper>
  );
};

/* Default props - <Alert />
============================================================================= */
Alert.defaultProps = {
  type: 'info',
  mb: 's4',
};

export default Alert;
