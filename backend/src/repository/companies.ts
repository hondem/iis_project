import CompanyModel from '../database/models/company'
import { Company, Companies } from '../types/companies'
import { IdOrIds } from 'objection'

/**
 * Return all companies
 */
const getAll = () : Promise<any> => {
  return CompanyModel.query()
}

/**
 * Return company by id
 * @param id 
 */
const getById = (id: IdOrIds) : Promise<any> => {
  return CompanyModel.query().findById(id).first()
}

/**
 * Create new company
 * @param company 
 */
const create = (company: Company) : Promise<any> => {
  return CompanyModel.query().insertAndFetch(<any>company)
}

/**
 * Update existing company
 * @param id 
 * @param data 
 */
const update = (id: IdOrIds, data: Company) : Promise<any> => {
  return CompanyModel.query().patchAndFetchById(id, <any>data)
}

export default {
  getAll,
  getById,
  create,
  update
}