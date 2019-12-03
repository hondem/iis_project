import { User } from '../types/auth';
import { AlertMessage } from '../types/common';

export type saveUserAction = {
  type: '[AUTH] SAVE_USER';
  payload: {
    user: User;
  };
};

export type setAlertMessageAction = {
  type: '[AUTH] SET_ALERT_MESSAGE',
  payload: {
    alertMessage: AlertMessage;
  }
}

type AuthAction = saveUserAction | setAlertMessageAction;

export default AuthAction;
