import Head from 'next/head';
import { NextPage, NextPageContext } from 'next';

import { Heading, Paragraph } from '../src/components/shared/typography';
import { Flex, Box } from '../src/components/shared/layout';
import SignInForm from '../src/components/auth/SignInForm/SignInForm';
import { checkAuthAuthorization } from '../src/next';

import * as S from '../src/components/auth/auth.styles';
import { Link } from '../src/components/shared/misc';

/* <SignIn />
============================================================================= */
const SignIn: NextPage = () => (
  <>
    <Head>
      <title>Prihlásenie - Payday</title>
    </Head>

    <S.Wrapper>
      <S.Form>
        <Box mb="s12">
          <Heading textAlign="center">Prihlásenie - Payday</Heading>
          <Paragraph textAlign="center">Pre prihlásenie zadajte svoj email a heslo.</Paragraph>
        </Box>

        <SignInForm />

        <Flex flexDirection="column" alignItems="center">
          <S.Separator />

          <Paragraph>
            Nemáte ešte účet? <Link href="/sign-up" passHref>Vytvorte si ho teraz!</Link>
          </Paragraph>
        </Flex>
      </S.Form>
    </S.Wrapper>
  </>
);

/* getInitialProps - <SignIn />
============================================================================= */
SignIn.getInitialProps = async (ctx: NextPageContext): Promise<{}> => {
  checkAuthAuthorization(ctx);
  return {};
}

export default SignIn;
