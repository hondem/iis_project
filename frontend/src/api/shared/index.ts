
import { NextPageContext } from "next";
import { parseCookies } from "nookies";

/**
 * Gets the auth token cookie.
 */
export const getAuthToken = (ctx: NextPageContext) => {
  const {accessToken} = parseCookies(ctx);
  return accessToken;
}