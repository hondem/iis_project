import EmployeesOperations from '../operations/persons'

import Koa from 'koa'
import validate from '../validations'
import employeesSchemas from '../validations/schemas/employees'

import _ from 'lodash'


/**
 * Creates new employee in company
 * @param ctx 
 */
const create = async(ctx: Koa.Context) : Promise<any> => {
  const data = _.clone(ctx.request.body)
  data.spolecnost = parseInt(ctx.params.companyId)

  validate(data, employeesSchemas.createPersonalData)
  ctx.body = await EmployeesOperations.create(data)
}

/**
 * Get employees within one company
 * @param ctx 
 */
const getByCompany = async(ctx: Koa.Context) : Promise<any> => {
  const data = {
    companyId: parseInt(ctx.params.companyId)
  }

  validate(data, employeesSchemas.getEmployeesByCompany)
  ctx.body = await EmployeesOperations.getByCompany(data.companyId)
}

/**
 * Get certain employee in company
 * @param ctx 
 */
const getByCompanyAndId = async(ctx: Koa.Context) : Promise<any> => {
  const data = {
    companyId: parseInt(ctx.params.companyId),
    employeeId: parseInt(ctx.params.employeeId)
  }

  validate(data, employeesSchemas.getEmployeeByIdInCompany)
  ctx.body = await EmployeesOperations.getByIdInCompany(data.companyId, data.employeeId)
}

/**
 * Updates certain employee
 * @param ctx 
 */
const update = async(ctx: Koa.Context) : Promise<any> => {
  const data = _.clone(ctx.request.body)
  data.companyId = parseInt(ctx.params.companyId)
  data.employeeId = parseInt(ctx.params.employeeId)

  validate(data, employeesSchemas.updatePersonalData)
  ctx.body = await EmployeesOperations.update(data)
}

/**
 * Remove employee
 * @param ctx 
 */
const remove = async(ctx: Koa.Context) : Promise<any> => {
  const data = {
    companyId: parseInt(ctx.params.companyId),
    employeeId: parseInt(ctx.params.employeeId)
  }

  validate(data, employeesSchemas.removeEmployee)
  ctx.body = await EmployeesOperations.remove(data)
}

/**
 * Calculate salary for user
 * @param ctx 
 */
const calculate = async(ctx: Koa.Context) : Promise<any> => {
  const data = {
    companyId: parseInt(ctx.params.companyId),
    employeeId: parseInt(ctx.params.employeeId),
    date: ctx.params.date
  }

  validate(data, employeesSchemas.calculate)
  ctx.body = await EmployeesOperations.calculate(data)
}

export default {
  create,
  getByCompany,
  getByCompanyAndId,
  update,
  remove,
  calculate
}