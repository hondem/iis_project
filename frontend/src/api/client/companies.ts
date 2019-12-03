import { API } from '..';
import { getAuthToken } from '.';

/**
 * Get company employees.
 *
 * @param ctx NextJS context
 * @param companyId ID of the company for which to get users
 */
export const getCompanyEmployees = (companyId: number = 1) =>
  API.get<object[]>(`/companies/${companyId}/employees`, {
    headers: {
      Authorization: getAuthToken(),
    },
  });

/**
 * Gets employee by his ID.
 *
 * @param companyId ID of company employee belongs to
 * @param employeeID ID of employee that has to be received
 */
export const getEmployee = (companyId: number, employeeId: number) =>
  API.get<any>(`/companies/${companyId}/employees/${employeeId}`, {
    headers: {
      Authorization: getAuthToken(),
    },
  });

/**
 * Updates employee by his ID.
 *
 * @param companyId ID of company employee belongs to
 * @param employeeID ID of employee that has to be updated
 */
export const updateEmployee = (companyId: number, employeeId: number, employee: any) =>
  API.patch(
    `/companies/${companyId}/employees/${employeeId}`,
    {
      ...employee,
    },
    {
      headers: {
        Authorization: getAuthToken(),
      },
    },
  );

/**
 * Deletes employee by his ID.
 *
 * @param companyId ID of company employee belongs to
 * @param employeeID ID of employee that has to be deleted
 */
export const deleteEmployee = (companyId: number, employeeId: number) =>
  API.delete(`/companies/${companyId}/employees/${employeeId}`, {
    headers: {
      Authorization: getAuthToken(),
    },
  });

/**
 * Creates a new employee
 *
 * @param companyId ID of company employee should belong to
 * @param employee Object with employee's data
 */
export const createEmployee = (companyId: number, employee: any) =>
  API.post(
    `/companies/${companyId}/employees/`,
    {
      ...employee,
    },
    {
      headers: {
        Authorization: getAuthToken(),
      },
    },
  );

/**
 * Gets wage data for specified employee.
 * @param companyId ID of company employee belongs to
 * @param employeeId ID of employee of which to get wage data
 */
export const getWageData = (companyId: number = 1, employeeId: any, date: string) =>
  API.get<any>(`/companies/${companyId}/employees/${employeeId}/wage/effective/${date}`, {
    headers: {
      Authorization: getAuthToken(),
    },
  });

export const createWageData = (
  companyId: number = 1,
  employeeId: any,
  wageData: any,
) =>
  API.post(
    `/companies/${companyId}/employees/${employeeId}/wage`,
    {
      ...wageData,
    },
    {
      headers: {
        Authorization: getAuthToken(),
      },
    },
  );

/**
 * Gets components of specified employee.
 *
 * @param companyId ID of company employee belongs to
 * @param employeeId ID of employee of which to get components
 */
export const getEmployeesComponents = (companyId: number = 1, employeeId: any, date: string) =>
  API.get<any>(`/companies/${companyId}/employees/${employeeId}/folders/${date}`, {
    headers: {
      Authorization: getAuthToken(),
    },
  });

export const createComponent = (companyId: number = 1, employeeId: any, component: any) =>
  API.post<any>(
    `/companies/${companyId}/employees/${employeeId}/folders`,
    {
      ...component,
    },
    {
      headers: {
        Authorization: getAuthToken(),
      },
    },
  );

export const deleteComponent = (companyId: number = 1, employeeId: any, folderId: number) =>
  API.delete(`/companies/${companyId}/employees/${employeeId}/folders/${folderId}`, {
    headers: {
      Authorization: getAuthToken(),
    },
  });

export const getSalary = (companyId: number = 1, employeeId: any, year: string, month: string) =>
  API.get(`/companies/${companyId}/employees/${employeeId}/calculate/${year}-${month}-01`, {
    headers: {
      Authorization: getAuthToken(),
    },
  });
