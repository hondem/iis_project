import Koa from 'koa'
import Operations from '../operations/salary'
import validate from '../validations'
import schemas from '../validations/schemas/salary'
import _ from 'lodash'

/**
 * Get salary of employee by ID
 * @param ctx 
 */
const getByEmployeeId = async(ctx: Koa.Context) => {
  const data = {
    companyId: parseInt(ctx.params.companyId),
    employeeId: parseInt(ctx.params.employeeId),
  }

  validate(data, schemas.getByEmployeeId)
  ctx.body = await Operations.getByEmployeeId(data)
}

/**
 * Get salary of empoyee by id and date
 * @param ctx 
 */
const getByEmployeeIdAndDate = async(ctx: Koa.Context) => {
  const data = {
    companyId: parseInt(ctx.params.companyId),
    employeeId: parseInt(ctx.params.employeeId),
    date: ctx.params.date
  }

  validate(data, schemas.getByEmployeeIdAndDate)
  ctx.body = await Operations.getByEmployeeIdAndDate(data)
}

export default {
  getByEmployeeId,
  getByEmployeeIdAndDate
}