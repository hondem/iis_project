import { NextPageContext } from 'next';
import { parseCookies } from 'nookies';
import Router from 'next/router';

/**
 * Checks if user is signed in. If he's not, redirect to sign in.
 * 
 * @param ctx Next.js context
 */
export const checkAuthorization = (ctx: NextPageContext): string => {
  const { accessToken } = parseCookies(ctx);

  if (!accessToken) {
    if (ctx.req) {
      ctx.res.writeHead(302, { Location: '/sign-in' });
      ctx.res.end();
      return;
    } else {
      Router.push('/sign-in');
      return;
    }
  }

  return accessToken;
};

/**
 * Checks if user is is signed in. If he is, redirect to private section.
 * 
 * @param ctx Next.js context
 */
export const checkAuthAuthorization = (ctx: NextPageContext) => {
  const { accessToken } = parseCookies(ctx);

  if (accessToken) {
    if (ctx.req) {
      ctx.res.writeHead(302, { Location: '/employees' });
      ctx.res.end();
      return;
    } else {
      Router.push('/employees');
      return;
    }
  }
};