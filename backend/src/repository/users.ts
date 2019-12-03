import UserModel from '../database/models/user'
import { IdOrIds, QueryBuilder } from 'objection'
import { User } from '../types/users'

/**
 * Return all users
 */
const getAll = () : Promise<any> => {
  return UserModel.query()
}

/**
 * Returns user by ID
 * @param id 
 */
const getById = (id: IdOrIds) : Promise<any> => {
  return UserModel.query().findById(id).first()
}

/**
 * Get by email
 * @param email 
 */
const getByEmail = (email: string) : Promise<any> => {
  return UserModel.query().where('email', email).first()
}

/**
 * Creates user
 * @param user 
 */
const create = (user: User) : Promise<any> => {
  return UserModel.query().insertAndFetch(<any>user)
}

/**
 * Update user
 * @param id 
 * @param data 
 */
const update = (id: IdOrIds, data: User): Promise<any> => {
  return UserModel.query().patchAndFetchById(id, <any>data)
}

export default {
  getAll,
  getById,
  getByEmail,
  create,
  update
}