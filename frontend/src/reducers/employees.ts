import { assoc } from 'ramda';

import EmployeesAction from '../actions/employees';

/* Type
============================================================================= */
export type EmployeesState = {
  list: object[];
};

/* Initial state
============================================================================= */
const initialState: EmployeesState = {
  list: null,
};

/* Reducer
============================================================================= */
export default (state = initialState, action: EmployeesAction) => {
  switch (action.type) {
    case '[EMPLOYEES] SAVE_EMPLOYEES': {
      const { list } = action.payload;

      return assoc('list', list)(state);
    }

    default:
      return state;
  }
};
