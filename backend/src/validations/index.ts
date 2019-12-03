import JSONSchema from 'jsonschema'
import errors from '../utils/errors'

const validate = (data, schema) => {
  const validationErrors = JSONSchema.validate(data, schema).errors
  if(validationErrors.length > 0){
    let message: string = ""
    validationErrors.map(error => {
      message += `${error.property} ${error.message} \n`
    })
    throw new errors.ValidationError(errors.VALIDATION_ERROR, message)
  }
}

export default validate