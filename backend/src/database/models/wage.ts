import { Model } from 'objection'

class Wage extends Model {
  static get tableName(){
    return 'm.udaje'
  }

  static get idColumn() {
    return ['id', 'platnost_od'];
  }
}

export = Wage 