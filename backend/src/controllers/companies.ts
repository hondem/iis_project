import CompaniesOperations from '../operations/companies'

import Koa from 'koa'
import validate from '../validations'
import companiesSchemas from '../validations/schemas/companies'

import _ from 'lodash'


/**
 * Return all companies
 */
const getAll = async(ctx: Koa.Context) : Promise<any> => {
  ctx.body = await CompaniesOperations.getAll()
}

/**
 * Get certain company
 * @param ctx 
 */
const getById = async(ctx: Koa.Context) : Promise<any> => {
  const data = {
    id: parseInt(ctx.params.id)
  }

  validate(data, companiesSchemas.getById)
  ctx.body = await CompaniesOperations.getById(data.id)
}

/**
 * Create new company
 * @param ctx 
 */
const create = async(ctx: Koa.Context) : Promise<any> => {
  const data = {
    name: ctx.request.body.name
  }

  validate(data, companiesSchemas.create)
  ctx.body = await CompaniesOperations.create(data)
}

/**
 * Update existing company
 * @param ctx 
 */
const update = async(ctx: Koa.Context) : Promise<any> => {
  const data = {
    id: parseInt(ctx.params.id),
    name: ctx.request.body.name
  }

  validate(data, companiesSchemas.update)
  ctx.body = await CompaniesOperations.update(data)
}

export default {
  getAll,
  getById,
  create,
  update,
}