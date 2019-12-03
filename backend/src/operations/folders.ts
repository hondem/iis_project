import FoldersRepository from '../repository/folders'
import EmployeeOperations from './persons'

import errors from '../utils/errors'

/**
 * Get folder by Id
 * @param data 
 */
const getById = async(data) => {
  const foundEmployee = await EmployeeOperations.getByIdInCompany(data.companyId, data.employeeId)
  if(!foundEmployee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Employee does not exist")

  const foundFolder = await FoldersRepository.getById(data.folderId)
  if(!foundFolder) throw new errors.NotFound(errors.FOLDER_NOT_FOUND, "Folder not found")

  return foundFolder
}

/**
 * Get all folders for employee
 * @param data 
 */
const getByEmployeeId = async(data) => {
  const foundEmployee = await EmployeeOperations.getByIdInCompany(data.companyId, data.employeeId)
  if(!foundEmployee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Employee not found!")

  return FoldersRepository.getByEmployeeId(data.employeeId)
}

/**
 * Get all folder of employee whithin month
 * @param data 
 */
const getByEmployeeIdAndMonth = async(data) => {
  const foundEmployee = await EmployeeOperations.getByIdInCompany(data.companyId, data.employeeId)
  if(!foundEmployee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Employee not found!")

  return FoldersRepository.getByEmployeeIdAndMonth(data.employeeId, data.date)
}

/**
 * Create new folder record in db
 * @param data 
 */
const create = async(data) => {
  const foundEmployee = await EmployeeOperations.getByIdInCompany(data.companyId, data.employeeId)
  if(!foundEmployee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Employee does not exist")

  const employeeId = data.employeeId

  delete data.employeeId
  delete data.companyId
  data.os_id = employeeId

  return FoldersRepository.create(data)
}

/**
 * Remove row from db
 * @param data 
 */
const remove = async(data) => {
  const foundEmployee = await EmployeeOperations.getByIdInCompany(data.companyId, data.employeeId)
  if(!foundEmployee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Employee does not exist")

  const foundFolder = await FoldersRepository.getById(data.folderId)
  if(!foundFolder) throw new errors.NotFound(errors.FOLDER_NOT_FOUND, "Folder not found")

  return FoldersRepository.remove(data.folderId)
}

/**
 * Update certain record
 * @param data 
 */
const update = async(data) => {
  const foundEmployee = await EmployeeOperations.getByIdInCompany(data.companyId, data.employeeId)
  if(!foundEmployee) throw new errors.NotFound(errors.PERSON_NOT_FOUND, "Employee does not exist")

  const foundFolder = await FoldersRepository.getById(data.folderId)
  if(!foundFolder) throw new errors.NotFound(errors.FOLDER_NOT_FOUND, "Folder not found")

  const folderId = data.folderId

  delete data.companyId
  delete data.employeeId
  delete data.folderId

  return FoldersRepository.update(folderId, data)
}

export default {
  getById,
  getByEmployeeId,
  getByEmployeeIdAndMonth,
  create,
  remove,
  update
}

