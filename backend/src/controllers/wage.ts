import Koa from 'koa'
import Operations from '../operations/wage'
import validate from '../validations'
import schemas from '../validations/schemas/wage'
import _ from 'lodash'

/**
 * Get all wage records for employee
 * @param ctx 
 */
const getByEmployee = async(ctx: Koa.Context) => {
  const data = {
    companyId: parseInt(ctx.params.companyId),
    employeeId: parseInt(ctx.params.employeeId),
  }

  validate(data, schemas.getByEmployee)
  ctx.body = await Operations.getByEmployee(data)
}

/**
 * Get one certain wage for employee at specific date
 * @param ctx 
 */
const getByEmployeeAndDate = async(ctx: Koa.Context) => {
  const data = {
    companyId: parseInt(ctx.params.companyId),
    employeeId: parseInt(ctx.params.employeeId),
    date: ctx.params.date
  }

  validate(data, schemas.getByEmployeeAndDate)
  ctx.body = await Operations.getByEmployeeAndDate(data)
}

/**
 * Get effective wage record in certain date
 * @param ctx 
 */
const getByEmployeeAndEffectiveDate = async(ctx: Koa.Context) => {
  const data = {
    companyId: parseInt(ctx.params.companyId),
    employeeId: parseInt(ctx.params.employeeId),
    date: ctx.params.date
  }

  validate(data, schemas.getByEmployeeAndEffectiveDate)
  ctx.body = await Operations.getByEmployeeAndEffectiveDate(data)
}

/**
 * Create new wage record
 * @param ctx 
 */
const create = async(ctx: Koa.Context) => {
  const data = _.clone(ctx.request.body)
  data.companyId = parseInt(ctx.params.companyId)
  data.employeeId = parseInt(ctx.params.employeeId)

  validate(data, schemas.create)
  ctx.body = await Operations.create(data)
}

/**
 * Update wage record in datatbase
 * @param ctx 
 */
const update = async(ctx: Koa.Context) => {
  const data = _.clone(ctx.request.body)
  data.companyId = parseInt(ctx.params.companyId)
  data.employeeId = parseInt(ctx.params.employeeId)
  data.date = ctx.params.date

  validate(data, schemas.update)
  ctx.body = await Operations.update(data)
}

/**
 * Remove wage record in database
 * @param ctx 
 */
const remove = async(ctx: Koa.Context) => {
  const data = {
    companyId: parseInt(ctx.params.companyId),
    employeeId: parseInt(ctx.params.employeeId),
    date: ctx.params.date
  }

  validate(data, schemas.remove)
  ctx.body = await Operations.remove(data)
}

export default {
  getByEmployee,
  getByEmployeeAndDate,
  getByEmployeeAndEffectiveDate,
  create,
  update,
  remove
}

