import { combineReducers } from 'redux';

import auth from './auth';
import employees from './employees';

const rootReducer = combineReducers({
  auth,
  employees,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
