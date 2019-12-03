export type saveEmployeesAction = {
  type: '[EMPLOYEES] SAVE_EMPLOYEES';
  payload: {
    list: object[];
  };
};

type EmployeesAction = saveEmployeesAction;

export default EmployeesAction;
