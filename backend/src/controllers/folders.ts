import Koa from 'koa'
import Operations from '../operations/folders'
import validate from '../validations'
import schemas from '../validations/schemas/folders'
import _ from 'lodash'

/**
 * Get folder by id
 * @param ctx 
 */
const getById = async(ctx: Koa.Context) => {
  const data = {
    employeeId: parseInt(ctx.params.employeeId),
    companyId: parseInt(ctx.params.companyId),
    folderId: parseInt(ctx.params.folderId)
  } 

  validate(data, schemas.getById)
  ctx.body = await Operations.getById(data)
}

/**
 * Get all folder records for one user
 * @param ctx 
 */
const getByEmployeeId = async(ctx: Koa.Context) => {
  const data = {
    employeeId: parseInt(ctx.params.employeeId),
    companyId: parseInt(ctx.params.companyId)
  }

  validate(data, schemas.getByEmployeeId)
  ctx.body = await Operations.getByEmployeeId(data)
}

/**
 * Get all folder records for user within one month
 * @param ctx 
 */
const getByEmployeeIdAndMonth = async(ctx: Koa.Context) => {
  const data = {
    employeeId: parseInt(ctx.params.employeeId),
    companyId: parseInt(ctx.params.companyId),
    date: ctx.params.date
  }

  validate(data, schemas.getByEmployeeIdAndMonth)
  ctx.body = await Operations.getByEmployeeIdAndMonth(data)
}

/**
 * Create new folder record
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
 * Remove folder record
 * @param ctx 
 */
const remove = async(ctx: Koa.Context) => {
  const data = {
    employeeId: parseInt(ctx.params.employeeId),
    companyId: parseInt(ctx.params.companyId),
    folderId: parseInt(ctx.params.folderId)
  } 

  validate(data, schemas.remove)
  ctx.body = await Operations.remove(data)
}

/**
 * Update folder record
 * @param ctx 
 */
const update = async(ctx: Koa.Context) => {
  const data = _.clone(ctx.request.body)
  data.employeeId = parseInt(ctx.params.employeeId)
  data.companyId = parseInt(ctx.params.companyId)
  data.folderId = parseInt(ctx.params.folderId)

  validate(data, schemas.update)
  ctx.body = await Operations.update(data)
}

export default {
  getById,
  getByEmployeeId,
  getByEmployeeIdAndMonth,
  create,
  update,
  remove
}