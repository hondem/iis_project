/**
 * Subtype const
 */
const USER_NOT_FOUND = "USER_NOT_FOUND"
const USER_ALREADY_EXISTS = "USER_ALREADY_EXISTS"
const USER_WRONG_PASSWORD = "USER_WRONG_PASSWORD"
const NO_TOKEN = "NO_TOKEN"
const TOKEN_EXPIRED = "TOKEN_EXPIRED"
const TOKEN_PAYLOAD_ERROR = "TOKEN_PAYLOAD_ERROR"
const TOKEN_INSUFFICIENT_PERMISSIONS = "TOKEN_INSUFFICIENT_PERMISSIONS"
const VALIDATION_ERROR = "VALIDATION_ERROR"
const PAGE_NOT_FOUND = "PAGE_NOT_FOUND"
const COMPANY_NOT_FOUND = "COMPANY_NOT_FOUND"
const PERSON_NOT_FOUND = "PERSON_NOT_FOUND"
const WAGE_NOT_FOUND = "WAGE_NOT_FOUND"
const WAGE_ALREADY_EXISTS = "WAGE_ALREADY_EXISTS"
const FOLDER_NOT_FOUND = "FOLDER_NOT_FOUND"
const SALARY_NOT_FOUND = "SALARY_NOT_FOUND"

/**
 * Base class for App errors
 */
class AppError extends Error{
  type: string = null
  subType: string = null
  code: number = null

  constructor(message: string, type: string, subType: string, code: number){
    super()
    this.message = message
    this.type = type
    this.subType = subType
    this.code = code
  }
}

/**
 * Not found error
 */
class NotFound extends AppError{
  constructor(subtype: string, message?: string){
    super(message || "Sorry, team of highly trained monkeys from VUT FIT labs are working on fixing your issue", 'NOT_FOUND', subtype,  404)
  }
}

/**
 * Validation error
 */
class ValidationError extends AppError{
  constructor(subtype: string, message?: string){
    super(message || "Validation failed", 'VALIDATION_ERROR', subtype, 400)
  }
}

/**
 * Unauthorized error
 */
class AuthorizationError extends AppError{
  constructor(subtype: string, message?: string){
    super(message || "Unauthorized access", 'UNAUTHORIZED_ERROR', subtype, 401)
  }
}

/**
 * Duplication error
 */
class DuplicationError extends AppError{
  constructor(subtype: string, message?: string){
    super(message || "Duplication error", 'DUPLICATION_ERROR', subtype, 400)
  }
}

/**
 * Internal server error
 */
class InternalError extends AppError{
  constructor(subtype: string, message?: string){
    super(message || "Internal server error... BOOOOOOM💥", 'INTERNAL_ERROR', 'INTERNAL_ERROR', 500)
  }
}

export default {
  AppError,
  NotFound,
  ValidationError,
  AuthorizationError,
  DuplicationError,
  InternalError,

  USER_NOT_FOUND,
  USER_ALREADY_EXISTS,
  USER_WRONG_PASSWORD,
  NO_TOKEN,
  TOKEN_EXPIRED,
  TOKEN_PAYLOAD_ERROR,
  TOKEN_INSUFFICIENT_PERMISSIONS,
  VALIDATION_ERROR,
  PAGE_NOT_FOUND,
  COMPANY_NOT_FOUND,
  PERSON_NOT_FOUND,
  WAGE_NOT_FOUND,
  WAGE_ALREADY_EXISTS,
  FOLDER_NOT_FOUND,
  SALARY_NOT_FOUND
}