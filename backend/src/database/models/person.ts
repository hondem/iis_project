import { Model } from 'objection'

class Person extends Model {
  static get tableName(){
    return 'm.osoba'
  }
}

export = Person