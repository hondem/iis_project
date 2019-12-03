import SalaryRepository from '../repository/salary'
import errors from '../utils/errors'

import EmployeeOperations from './persons'

import logger from '../utils/logger'

/**
 * Get salaries by employee id
 * @param data 
 */
const getByEmployeeId = async(data) => {
  logger.info(EmployeeOperations)
  const foundEmployee = await EmployeeOperations.getByIdInCompany(data.companyId, data.employeeId)
  if(!foundEmployee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Employee was not found")

  const salaries = <any>(await SalaryRepository.getByEmployeeId(data.employeeId))

  return salaries.map(salary => {
    return {
      obdobie: salary.obdobie,
      hruba_mzda: salary.vektor.split(";")[240],
      cista_mzda: salary.vektor.split(";")[241]
    }
  })
}

/**
 * Return one certain salaryr record
 * @param data 
 */
const getByEmployeeIdAndDate = async(data) => {
  const foundEmployee = await EmployeeOperations.getByIdInCompany(data.companyId, data.employeeId)
  if(!foundEmployee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Employee was not found")

  const foundSalary = <any>(await SalaryRepository.getByEmployeeIdAndDate(data.employeeId, data.date))
  if(!foundSalary) throw new errors.NotFound(errors.SALARY_NOT_FOUND, "Salary record not found in database")

  return {
    obdobie: foundSalary.obdobie,
    hruba_mzda: foundSalary.vektor.split(";")[240],
    cista_mzda: foundSalary.vektor.split(";")[241]
  }
}

export default {
  getByEmployeeId,
  getByEmployeeIdAndDate
}