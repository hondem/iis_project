import SalaryModel from '../database/models/salary'
import { IdOrIds } from 'objection'

/**
 * Get salary by employee Id
 * @param id 
 */
const getByEmployeeId = (id: IdOrIds) => {
  return SalaryModel.query().where('id', id)
}

/**
 * Get salary by employee and date
 * @param id 
 * @param date 
 */
const getByEmployeeIdAndDate = (id: IdOrIds, date) => {
  return SalaryModel.query().where('id', id).andWhere('obdobie', date).first()
}

export default {
  getByEmployeeId,
  getByEmployeeIdAndDate
}