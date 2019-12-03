import React from 'react';
import { Flex, Box, Grid } from '..';
import { Heading, Paragraph } from '../../typography';

import * as S from './PageHeader.styles';

/* Props - <PageHeader />
============================================================================= */
type Props = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
};

/* <PageHeader />
============================================================================= */
const PageHeader: React.FunctionComponent<Props> = ({ icon, title, subtitle, children }) => {
  return (
    <S.Wrapper>
      <Flex alignItems="center" mb={['s6', null, 0]}>
        <S.IconWrapper>{icon}</S.IconWrapper>

        <Box ml={['s4', 's8']}>
          <Heading mb="s2">{title}</Heading>
          <Paragraph mb="0" color="grays.2" fontWeight="bold">
            {subtitle}
          </Paragraph>
        </Box>
      </Flex>

      <Grid gridAutoFlow={['row', null, 'column']} gridGap={['s4', null, null, 's6']} alignItems="center" justifyItems="center">
        {children}
      </Grid>
    </S.Wrapper>
  );
};

export default PageHeader;
