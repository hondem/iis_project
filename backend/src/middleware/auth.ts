import errors from '../utils/errors'
import { Context } from 'koa'
import operations from '../operations/users'

const AUTH_GOD: string = "exact_god"
const AUTH_ACCOUNTANT: string = "exact_accountant"
const AUTH_PERSONALIST: string = "exact_personalist"
const AUTH_ADMIN: string = "exact_admin"
const AUTH_MIN_ACCOUNTANT: string = "min_accountant"
const AUTH_MIN_PERSONALIST: string = "min_personalist"
const AUTH_PERSONALIST_AND_ADMIN: string = "personalist_and_admin"
const AUTH_MIN_ADMIN: string = "min_admin"

/**
 * General authorization middleware
 * @param ctx Context
 * @param next Next middleware
 * @param authLevel Level that should be authenticated
 */
const authorize = async(ctx: Context, next, authLevel: string) => {
  if(!ctx.header.authorization) throw new errors.AuthorizationError(errors.NO_TOKEN, 'I NEED AUTHORIZATION TOKEN YOU MORRON! 😡')
  const data = await operations.verifyTokenPayload(ctx.header.authorization)

  // Checking permissions...
  if(
    (authLevel == AUTH_GOD && data.user.authLevel == "god") ||
    (authLevel == AUTH_ADMIN && data.user.authLevel == "admin") ||
    (authLevel == AUTH_ACCOUNTANT && data.user.authLevel == "accountant") ||
    (authLevel == AUTH_PERSONALIST && data.user.authLevel == "personalist") ||
    (authLevel == AUTH_PERSONALIST_AND_ADMIN && (data.user.authLevel == "personalist" || data.user.authLevel == "admin")) ||
    (authLevel == AUTH_MIN_ACCOUNTANT && (data.user.authLevel == "accountant" || data.user.authLevel == "admin" || data.user.authLevel == "god")) ||
    (authLevel == AUTH_MIN_PERSONALIST && (data.user.authLevel == "personalist" || data.user.authLevel == "accountant" || data.user.authLevel == "admin" || data.user.authLevel == "god")) ||
    (authLevel == AUTH_MIN_ADMIN && (data.user.authLevel == "admin" || data.user.authLevel == "god"))
  ) {
    
    if (ctx.response && data.loginTimeout) ctx.set('Login-timeout', data.loginTimeout.toString())
    ctx.state.user = data.user
    
    return next()
  } else {
    throw new errors.AuthorizationError(errors.TOKEN_INSUFFICIENT_PERMISSIONS, "Permissions error... 👮‍♀️")
  }
}

/**
 * Accountant auth middleware
 * @param ctx Context
 * @param next Next middleware
 */
const accountant = (ctx: Context, next) => {
  return authorize(ctx, next, AUTH_ACCOUNTANT)
}

/**
 * Personalist auth middleware
 * @param ctx Context
 * @param next Next middleware
 */
const personalist = (ctx: Context, next) => {
  return authorize(ctx, next, AUTH_PERSONALIST)
}

/**
 * Admin auth middleware
 * @param ctx Context
 * @param next Next middleware
 */
const admin = (ctx: Context, next) => {
  return authorize(ctx, next, AUTH_ADMIN)
}

/**
 * God auth middleware
 * @param ctx Context
 * @param next Next middleware
 */
const god = (ctx: Context, next) => {
  return authorize(ctx, next, AUTH_GOD)
}

/**
 * Minimal accountant auth middleware
 * @param ctx Context
 * @param next Next middleware
 */
const minAccountant = (ctx: Context, next) => {
  return authorize(ctx, next, AUTH_MIN_ACCOUNTANT)
}

/**
 * Minimal personalist auth middleware
 * @param ctx Context
 * @param next Next middleware
 */
const minPersonalist = (ctx: Context, next) => {
  return authorize(ctx, next, AUTH_MIN_PERSONALIST)
}

/**
 * Minimal admin auth middleware
 * @param ctx Context
 * @param next Next middleware
 */
const minAdmin = (ctx: Context, next) => {
  return authorize(ctx, next, AUTH_MIN_ADMIN)
}

/**
 * Permissions for admin and personalist
 * @param ctx 
 * @param next 
 */
const personalistOrAdmin = (ctx: Context, next) => {
  return authorize(ctx, next, AUTH_PERSONALIST_AND_ADMIN)
}

export default {
  accountant,
  personalist,
  admin,
  god,
  minAccountant,
  minPersonalist,
  minAdmin,
  personalistOrAdmin
}