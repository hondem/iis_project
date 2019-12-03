import { NextPage, NextPageContext } from 'next';
import Router from 'next/router';

import { checkAuthorization } from '../src/next';

/* <Index />
============================================================================= */
const Index: NextPage = () => null;

/* getInitialProps - <Index />
============================================================================= */
Index.getInitialProps = async (ctx: NextPageContext): Promise<null> => {
  if (checkAuthorization(ctx)) {
    if (ctx.req) {
      ctx.res.writeHead(302, { Location: '/employees' });
      ctx.res.end();
    } else {
      Router.push('/employees');
    }
  }

  return null;
}

export default Index;