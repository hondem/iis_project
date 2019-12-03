import Cookies from "js-cookie";
import { COOKIE_ACCESS_TOKEN } from "..";

/**
 * Stores auth token into a cookie.
 * 
 * @param token Auth token
 */
export const setAuthToken = (token: string) => Cookies.set(COOKIE_ACCESS_TOKEN, token);

/**
 * Gets the auth token cookie.
 */
export const getAuthToken = () => Cookies.get(COOKIE_ACCESS_TOKEN);

/**
 * Removes the auth token cookie.
 */
export const removeAuthToken = () => Cookies.remove(COOKIE_ACCESS_TOKEN);