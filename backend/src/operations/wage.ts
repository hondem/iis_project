import WageRepository from '../repository/wage'
import { IdOrIds } from 'objection'
import { Company } from '../types/companies'
import errors from '../utils/errors'

import logger from '../utils/logger'

import EmployeesOperations from './persons'

/**
 * Get records by employee
 * @param employee 
 */
const getByEmployee = async(employee) => {
  const foundEmployee = await EmployeesOperations.getByIdInCompany(employee.companyId, employee.employeeId)
  if(!foundEmployee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Employee not found")

  return WageRepository.getByEmployee(employee.employeeId)
}

/**
 * Get one certain record
 * @param employee 
 */
const getByEmployeeAndDate = async(data) => {
  const foundEmployee = await EmployeesOperations.getByIdInCompany(data.companyId, data.employeeId)
  if(!foundEmployee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Employee not found")

  const wage = await WageRepository.getByEmployeeAndDate(foundEmployee.id, data.date)
  if(!wage) throw new errors.NotFound(errors.WAGE_NOT_FOUND, "Wage record was not found")
  return wage
}

/**
 * Get effective wage record in date
 * @param data 
 */
const getByEmployeeAndEffectiveDate = async(data) => {
  const foundEmployee = await EmployeesOperations.getByIdInCompany(data.companyId, data.employeeId)
  if(!foundEmployee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Employee not found")

  const wage = await WageRepository.getByEmployeeAndEffectiveDate(data.employeeId, data.date)
  if(!wage) throw new errors.NotFound(errors.WAGE_NOT_FOUND, "Effective wage for this date doesn't exist")
  return wage
}

/**
 * Create new wage record
 * @param data 
 */
const create = async(data) => {
  const foundEmployee = await EmployeesOperations.getByIdInCompany(data.companyId, data.employeeId)
  if(!foundEmployee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Employee not found")

  const wage = await WageRepository.getByEmployeeAndDate(foundEmployee.id, data.platnost_od)
  
  delete data.companyId
  delete data.employeeId

  if(wage){
    const date = data.platnost_od
    delete data.platnost_od
    return WageRepository.update(foundEmployee.id, date, data)
  } else {
    data.id = foundEmployee.id
    return WageRepository.create(data)   
  }
}

/**
 * Update wage record
 * @param data 
 */
const update = async(data) => {
  const foundEmployee = await EmployeesOperations.getByIdInCompany(data.companyId, data.employeeId)
  if(!foundEmployee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Employee not found")

  const wage = await WageRepository.getByEmployeeAndDate(foundEmployee.id, data.date)
  if(!wage) throw new errors.NotFound(errors.WAGE_NOT_FOUND, "Wage record was not found")

  const employeeId = data.employeeId
  const date = data.date

  delete data.companyId
  delete data.employeeId
  delete data.date

  return WageRepository.update(employeeId, date, data)
}

/**
 * Remove wage record
 * @param data 
 */
const remove = async(data) => {
  const foundEmployee = await EmployeesOperations.getByIdInCompany(data.companyId, data.employeeId)
  if(!foundEmployee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Employee not found")

  const wage = await WageRepository.getByEmployeeAndDate(foundEmployee.id, data.date)
  if(!wage) throw new errors.NotFound(errors.WAGE_NOT_FOUND, "Wage record was not found")

  return WageRepository.remove(data.employeeId, data.date)
}

export default {
  getByEmployee,
  getByEmployeeAndDate,
  getByEmployeeAndEffectiveDate,
  create,
  update,
  remove
}