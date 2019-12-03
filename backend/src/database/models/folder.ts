import { Model } from 'objection'

class Folder extends Model {
  static get tableName(){
    return 'm.zlozky'
  }
}

export = Folder