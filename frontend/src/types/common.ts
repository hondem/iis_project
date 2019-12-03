import { AlertType } from '../components/shared/misc/Alert/Alert';

export type AlertMessage = {
  type: AlertType;
  message: string;
};

export type ErrorReponse = {
  error: any;
  response: {
    type:
      | 'VALIDATION_ERROR'
      | 'UNAUTHORIZED_ERROR'
      | 'DUPLICATION_ERROR'
      | 'INTERNAL_ERROR'
      | 'NOT_FOUND';
    subType: 'NOT_FOUND' | 'USER_WRONG_PASSWORD' | 'USER_NOT_FOUND';
    message: string;
    stack?: any;
  };
};

export type SelectOption = {
  label: string;
  value: string;
}
