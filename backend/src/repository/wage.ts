import WageModel from '../database/models/wage'
import { IdOrIds } from 'objection'

/**
 * Return all wageDatas
 */
const getAll = () : Promise<any> => {
  return WageModel.query()
}

/**
 * Get all wages records for employee
 * @param employeeId 
 */
const getByEmployee = (employeeId : IdOrIds) : Promise<any> => {
  return WageModel.query().where('id', employeeId)
}

/**
 * Get certain wage record
 * @param employeeId 
 * @param date 
 */
const getByEmployeeAndDate = (employeeId : IdOrIds, date) : Promise<any> => {
  return WageModel.query().where('id', employeeId).where('platnost_od', date).first()
}

/**
 * Get wage record effective in certain date
 * @param employeeId 
 * @param date 
 */
const getByEmployeeAndEffectiveDate = (employeeId: IdOrIds, date) : Promise<any> => {
  return WageModel.query().where('id', employeeId).andWhere('platnost_od', '<=', date).orderBy('platnost_od', 'desc').first()
}

/**
 * Creates wageData
 * @param wageData 
 */
const create = (wageData) : Promise<any> => {
  return WageModel.query().insertAndFetch(wageData)
}

/**
 * Update wageData
 * @param id 
 * @param data 
 */
const update = (employeeId: IdOrIds, date,  data): Promise<any> => {
  return WageModel.query().patchAndFetchById([employeeId, date], data)
}

/**
 * Delete record
 * @param id 
 */
const remove = (employeeId: IdOrIds, date) : Promise<any> => {
  return WageModel.query().where('id', employeeId).where('platnost_od', date).delete()
}

export default {
  getAll,
  getByEmployee,
  getByEmployeeAndDate,
  create,
  update,
  remove,
  getByEmployeeAndEffectiveDate
}