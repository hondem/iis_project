import UsersRepository from '../repository/users'
import { IdOrIds } from 'objection'
import errors from '../utils/errors'
import _ from 'lodash'

import crypto from '../utils/crypto'
import { User, Users, UserTokenPayload } from '../types/users'

/**
 * Returns all users
 */
const getAll = async() : Promise<Users> => {
  const users: Users = await UsersRepository.getAll()
  users.map((user) => { delete user.password })
  return users
}

/**
 * Get user by Id
 * @param id 
 */
const getById = async(id: IdOrIds) : Promise<User> => {
  const user: User = await UsersRepository.getById(id)
  if(!user) throw new errors.NotFound(errors.USER_NOT_FOUND, 'You have no money in your pocket... How much money do you have?')
  delete user.password
  return user
}

/**
 * Create new user
 * @param user 
 */
const create = async(user: User) : Promise<User> => {
  const existingUser: User = await UsersRepository.getByEmail(user.email)
  if(!_.isEmpty(existingUser)) throw new errors.DuplicationError(errors.USER_ALREADY_EXISTS, 'User with this email already exists!')

  user.password = await crypto.hash(user.password)
  user.authLevel = 'user'

  const createdUser: User = await UsersRepository.create(user)
  const accessToken: string = await crypto.generateToken(createdUser)
  
  createdUser.accessToken = accessToken
  delete createdUser.password
  return createdUser
}

/**
 * Logs user in
 * @param user 
 */
const login = async(user: User) : Promise<User> => {
  const foundUser: User = await UsersRepository.getByEmail(user.email)
  if(!foundUser) throw new errors.NotFound(errors.USER_NOT_FOUND, 'User not found')
  
  if(!(await crypto.compare(foundUser.password, user.password))) throw new errors.AuthorizationError(errors.USER_WRONG_PASSWORD, 'Wrong password..')

  foundUser.accessToken = await crypto.generateToken(foundUser)
  delete foundUser.password
  return foundUser
}

/**
 * Updates user in database
 * @param user 
 */
const update = async(user: User) : Promise<User> => {
  const userId: IdOrIds = user.id
  const existingUser: User = await UsersRepository.getById(userId)

  if(!existingUser) throw new errors.NotFound(errors.USER_NOT_FOUND, 'Hey! You are trying to update something that does not exist... Does it make any sence for you? 🤔')

  delete user.id
  const updatedUser: User = await UsersRepository.update(userId, user)
  delete updatedUser.password

  return updatedUser
}

/**
 * Changes user passwor
 * @param user 
 */
const changePassword = async(user: User) : Promise<User> => {
  const userId: IdOrIds = user.id
  const existingUser: User = await UsersRepository.getById(userId)

  if(!existingUser) throw new errors.NotFound(errors.USER_NOT_FOUND, 'Hey! You are trying to update something that does not exist... Does it make any sence for you? 🤔')

  user.password = await crypto.hash(user.password)
  delete user.id

  const patchedUser: User = await UsersRepository.update(userId, user)
  delete patchedUser.password

  return patchedUser
}

/**
 * Verifies whether token is valid
 * @param token 
 */
const verifyTokenPayload = async(token: string) => {
  const payload : UserTokenPayload = await crypto.verifyToken(token)
  const now = Date.now()

  if(!payload || !payload.exp || now > payload.exp * 1000){
    throw new errors.AuthorizationError(errors.TOKEN_EXPIRED)
  }

  const user : User = await UsersRepository.getById(payload.user.id)

  if(!user) throw new errors.AuthorizationError(errors.TOKEN_PAYLOAD_ERROR)
  
  return {
    user,
    loginTimeout: payload.exp * 1000
  }

}

export default {
  getAll,
  getById,
  create,
  update,
  changePassword,
  verifyTokenPayload,
  login
}