import Crypto from 'crypto'
import Config from '../config'
import bcrypt from 'bcryptjs'
import jwt, { SignOptions, VerifyOptions } from 'jsonwebtoken'
import { User, UserTokenPayload } from '../types/users'
import errors from '../utils/errors'

/**
 * Pepperifies password
 * @param password 
 */
const pepperify = (password: string) : string => {
  return Crypto.createHmac('sha256', Config.security.secretHash).update(password).digest('hex')
}

/**
 * Creates hash for password
 * @param password 
 */
const hash = (password: string) : Promise<string> => {
  return bcrypt.hash(pepperify(password), Config.security.saltRounds)
}

/**
 * Compares two passwords
 * @param hashedPassword 
 * @param password 
 */
const compare = (hashedPassword: string, password: string) : Promise<boolean> => {
  return bcrypt.compare(pepperify(password), hashedPassword)
}

/**
 * Generates new user's JWT
 * @param userEmail 
 */
const generateToken = (user: User) : Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign({ user }, Config.security.secretHash, <SignOptions>Config.security.jwtInputSettings, (err, res) => {
      if(err) reject(err)
      else resolve(res)
    })
  })
}

/**
 * Verify user's token
 * @param token 
 */
const verifyToken = async(token) : Promise<UserTokenPayload> => {
  try{
    return await new Promise((resolve, reject) => {
      jwt.verify(token, Config.security.secretHash, <VerifyOptions>Config.security.jwtOutputSettings, (err, res : UserTokenPayload) => {
        if(err) reject(err)
        else resolve(res)
      })
    })
  } catch(err){
    throw new errors.AuthorizationError(errors.TOKEN_INSUFFICIENT_PERMISSIONS, 'You are not permited to do this!')
  }
}

export default {
  pepperify,
  hash,
  compare,
  generateToken,
  verifyToken
}