import axios from 'axios';

import { getAuthToken } from './client';
import { ErrorReponse } from '../types/common';

export const COOKIE_ACCESS_TOKEN = 'accessToken';

/**
 * Creates Axios instance.
 */
export const API = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/* Request interceptor */
API.interceptors.request.use(null, error =>
  Promise.reject<ErrorReponse>({ error, response: error.response?.data }),
);

/* Response interceptor */
API.interceptors.response.use(null, error =>
  Promise.reject<ErrorReponse>({ error, response: error.response?.data }),
);
