import PersonModel from '../database/models/person'
import { IdOrIds } from 'objection'

/**
 * Return all users
 */
const getAll = () : Promise<any> => {
  return PersonModel.query()
}

/**
 * Returns user by ID
 * @param id 
 */
const getById = (id: IdOrIds) : Promise<any> => {
  return PersonModel.query().findById(id).first()
}

/**
 * Get by email
 * @param email 
 */
const getByEmail = (email: string) : Promise<any> => {
  return PersonModel.query().where('email', email).first()
}

/**
 * Get employees by company
 * @param id 
 */
const getByCompany = (id: IdOrIds) : Promise<any> => {
  return PersonModel.query().where('spolecnost', id)
}

/**
 * Get certain employee in company
 * @param companyId 
 * @param id 
 */
const getByIdInCompany = (companyId: IdOrIds, id: IdOrIds) : Promise<any> => {
  return PersonModel.query().where('spolecnost', companyId).where('id', id).first()
}

/**
 * Creates user
 * @param user 
 */
const create = (person) : Promise<any> => {
  return PersonModel.query().insertAndFetch(person)
}

/**
 * Update user
 * @param id 
 * @param data 
 */
const update = (id: IdOrIds, person): Promise<any> => {
  return PersonModel.query().patchAndFetchById(id, person)
}

/**
 * Remove certain employee from database
 * @param id 
 */
const remove = (id: IdOrIds) : Promise<any> => {
  return PersonModel.query().deleteById(id)
}

export default {
  getAll,
  getById,
  getByEmail,
  create,
  update,
  getByCompany,
  getByIdInCompany,
  remove
}