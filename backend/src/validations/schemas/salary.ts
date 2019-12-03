const getByEmployeeId = {
  type: 'object',
  required: true,
  additionalProperties: false,

  properties: {
    companyId: {
      type: 'integer',
      required: true
    },

    employeeId: {
      type: 'integer',
      required: true
    }
  }
}

const getByEmployeeIdAndDate = {
  type: 'object',
  required: true,
  additionalProperties: false,

  properties: {
    companyId: {
      type: 'integer',
      required: true
    },

    employeeId: {
      type: 'integer',
      required: true
    },

    date: {
      type: 'string',
      required: true,
      format: 'date'
    }
  }
}

export default {
  getByEmployeeId,
  getByEmployeeIdAndDate
}