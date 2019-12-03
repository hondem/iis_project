import { assoc } from 'ramda';

import { User } from '../types/auth';
import AuthAction from '../actions/auth';
import { AlertMessage } from '../types/common';

/* Type
============================================================================= */
export type AuthState = {
  user: User;
  alertMessage: AlertMessage;
};

/* Initial state
============================================================================= */
const initialState: AuthState = {
  user: null,
  alertMessage: null,
};

/* Reducer
============================================================================= */
export default (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case '[AUTH] SAVE_USER': {
      const { user } = action.payload;

      return assoc('user', user)(state);
    }

    case '[AUTH] SET_ALERT_MESSAGE': {
      const { alertMessage } = action.payload;

      return assoc('alertMessage', alertMessage)(state);
    }

    default:
      return state;
  }
};
