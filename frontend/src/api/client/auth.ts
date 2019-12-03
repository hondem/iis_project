import { User } from '../../types/auth';
import { API } from '..';
import JwtDecode from 'jwt-decode';

/**
 * Sends a sign in request with user's credentials.
 *
 * @param email User's email address
 * @param password User's password
 */
export const signIn = (email: string, password: string) =>
  API.post<User>('/users/login', {
    email,
    password,
  });
