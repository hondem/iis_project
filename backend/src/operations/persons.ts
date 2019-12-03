import PersonsRepository from '../repository/persons'
import { IdOrIds } from 'objection'
import errors from '../utils/errors'
import config from '../config'

import logger from '../utils/logger'

import EmployeesUtils from '../utils/employees'
import CompaniesOperations from './companies'
import SalaryOperations from './salary'

import util from 'util'
import path from 'path'
import { exec } from 'child_process'

const execPromisified = util.promisify(exec)

/**
 * Get employees in company
 * @param id 
 */
const getByCompany = async(id: IdOrIds) : Promise<any> => {
  const company = await CompaniesOperations.getById(id)
  if(!company) throw new errors.NotFound(errors.COMPANY_NOT_FOUND, "Given compaany doesn't exist")
  return (await PersonsRepository.getByCompany(id)).map(employee => { return EmployeesUtils.plainObjectToNested(employee) })
}

/**
 * Get certain employee in company
 * @param companyId 
 * @param employeeId 
 */
const getByIdInCompany = async(companyId: IdOrIds, employeeId: IdOrIds) => {
  const company = await CompaniesOperations.getById(companyId)
  if(!company) throw new errors.NotFound(errors.COMPANY_NOT_FOUND, "Given compaany doesn't exist")

  const employee = await PersonsRepository.getByIdInCompany(companyId, employeeId)
  if(!employee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Given employee was not found")

  return EmployeesUtils.plainObjectToNested(employee)
}

/**
 * Creates new person in database
 * @param person
 */
const create = async(person) : Promise<any> => {
  const company = await CompaniesOperations.getById(person.spolecnost)
  if(!company) throw new errors.NotFound(errors.COMPANY_NOT_FOUND, "Given company doesn't exist")
  return EmployeesUtils.plainObjectToNested(await PersonsRepository.create(person))
}

/**
 * Updates employee data
 * @param person 
 */
const update = async(person) : Promise<any> => {
  const companyId = person.companyId
  const employeeId = person.employeeId
  delete person.companyId
  delete person.employeeId

  const company = await CompaniesOperations.getById(companyId)
  if(!company) throw new errors.NotFound(errors.COMPANY_NOT_FOUND, "Given compaany doesn't exist")

  const employee = await PersonsRepository.getByIdInCompany(companyId, employeeId)
  if(!employee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Given employee was not found")

  return EmployeesUtils.plainObjectToNested(await PersonsRepository.update(employeeId, person))
}

/**
 * Remove certaian employee
 * @param person 
 */
const remove = async(data) : Promise<any> => {
  const company = await CompaniesOperations.getById(data.companyId)
  if(!company) throw new errors.NotFound(errors.COMPANY_NOT_FOUND, "Given compaany doesn't exist")

  const employee = await PersonsRepository.getByIdInCompany(data.companyId, data.employeeId)
  if(!employee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Given employee was not found")

  return PersonsRepository.remove(data.employeeId)
}

/**
 * Calculate salary
 * @param data 
 */
const calculate = async(data) : Promise<any> => {
  const companyId = data.companyId
  const employeeId = data.employeeId

  const company = await CompaniesOperations.getById(companyId)
  if(!company) throw new errors.NotFound(errors.COMPANY_NOT_FOUND, "Given compaany doesn't exist")

  const employee = await PersonsRepository.getByIdInCompany(companyId, employeeId)
  if(!employee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Given employee was not found")

  await execPromisified(`pip install psycopg2-binary`)
  await execPromisified(`python calc.py ${employeeId} ${data.date}`, {
    cwd: path.resolve(__dirname, "../../src/services/"),
    env: {
      DB_URI: config.db.uri
    }
  })

  const createdSalary = await SalaryOperations.getByEmployeeIdAndDate(data)
  return createdSalary
}

export default {
  create,
  update,
  getByCompany,
  getByIdInCompany,
  remove,
  calculate
}