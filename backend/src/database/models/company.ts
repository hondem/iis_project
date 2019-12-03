import { Model } from 'objection'

class Company extends Model {
  static get tableName(){
    return 'companies'
  }
}

export = Company