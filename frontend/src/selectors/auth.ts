import { createSelector } from 'reselect';

import { AppState } from '../reducers';
import { AuthState } from '../reducers/auth';
import { User } from '../types/auth';
import { AlertMessage } from '../types/common';

export const getAuthState = (state: AppState): AuthState => state.auth;

export const selectUser = createSelector<AppState, AuthState, User>(
  getAuthState,
  state => state.user,
);

export const selectAlertMessage = createSelector<AppState, AuthState, AlertMessage>(
  getAuthState,
  state => state.alertMessage,
);
