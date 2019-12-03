import { NextPage, NextPageContext } from 'next';
import Router from 'next/router';

/* <Index />
============================================================================= */
const Index: NextPage = () => null;

/* getInitialProps - <Index />
============================================================================= */
Index.getInitialProps = async (ctx: NextPageContext): Promise<null> => {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: `/employee/create/personal` });
    ctx.res.end();
  } else {
    Router.push('/employee/create/[formType]', `/employee/create/personal`);
  }

  return null;
};

export default Index;
