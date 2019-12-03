import { Model } from 'objection'

class Salary extends Model {
  static get tableName(){
    return 'm.vypocet'
  }
}

export = Salary