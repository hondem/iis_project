import CompaniesRepository from '../repository/companies'
import { IdOrIds } from 'objection'
import { Company } from '../types/companies'
import errors from '../utils/errors'

/**
 * Get all companies
 */
const getAll = () : Promise<any> => {
  return CompaniesRepository.getAll()
}

/**
 * Get certain company
 * @param id 
 */
const getById = async(id: IdOrIds) : Promise<any> => {
  const company = await CompaniesRepository.getById(id)
  if(!company) throw new errors.NotFound(errors.COMPANY_NOT_FOUND, "Couldn't found this company in DB")
  return company
}

/**
 * Creates new company in database
 * @param company 
 */
const create = (company: Company) : Promise<any> => {
  return CompaniesRepository.create(company)
}

/**
 * Updates company
 * @param company 
 */
const update = async(company: Company) : Promise<any> => {
  const foundCompany = await CompaniesRepository.getById(company.id)
  if(!foundCompany) throw new errors.NotFound(errors.COMPANY_NOT_FOUND, "Couldn't found this company in DB")
  const companyId = company.id
  delete company.id
  return CompaniesRepository.update(companyId, company)
}

export default {
  getAll,
  getById,
  create,
  update
}