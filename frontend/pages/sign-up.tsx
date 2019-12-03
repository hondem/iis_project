import Head from 'next/head';
import { NextPage, NextPageContext } from 'next';
import { checkAuthAuthorization } from '../src/next';

import { Heading, Paragraph } from '../src/components/shared/typography';

import * as S from '../src/components/auth/auth.styles';
import { Link } from '../src/components/shared/misc';

/* <SignUp />
============================================================================= */
const SignUp: NextPage = () => (
  <>
    <Head>
      <title>Registrácia - Payday</title>
    </Head>

    <S.Wrapper>
      <S.Form>
        <Heading textAlign="center">Registrácia - Payday</Heading>
        <Paragraph textAlign="center">Pre registráciu kontaktujte administrátora:</Paragraph>
        <Paragraph fontWeight="bold" textAlign="center">
          xkorec04@stud.fit.vutbr.cz
        </Paragraph>
        <S.Separator />

        <Paragraph textAlign="center">
          Už máte vytvorený účet? <Link href="/sign-in">Prihláste sa</Link>.
        </Paragraph>
      </S.Form>
    </S.Wrapper>
  </>
);

/* getInitialProps - <SignUp />
============================================================================= */
SignUp.getInitialProps = async (ctx: NextPageContext): Promise<{}> => {
  checkAuthAuthorization(ctx);
  return {};
}

export default SignUp;