// getByEmployeeId,
// getByEmployeeIdAndMonth,
// create,
// remove,
// update

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

const getByEmployeeIdAndMonth = {
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

const create = {
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

    kod: {
      type: 'integer',
      required: true
    },

    kod_ext: {
      type: 'string',
      required: true,
      maxLength: 10
    },

    datum_od: {
      type: 'string',
      required: true,
      format: 'date'
    },

    datum_do: {
      type: 'string',
      required: true,
      format: 'date'
    },

    pozn: {
      type: 'string'
    }
  }
}

const update = {
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

    folderId: {
      type: 'integer',
      required: true
    },

    kod: {
      type: 'integer',
    },

    kod_ext: {
      type: 'string',
      maxLength: 10
    },

    datum_od: {
      type: 'string',
      format: 'date'
    },

    datum_do: {
      type: 'string',
      format: 'date'
    },

    pozn: {
      type: 'string'
    }
  }
}

const remove = {
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

    folderId: {
      type: 'integer',
      required: true
    }
  }
}

const getById = {
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

    folderId: {
      type: 'integer',
      required: true
    }
  }
}

export default {
  getByEmployeeId,
  getByEmployeeIdAndMonth,
  create,
  remove,
  update,
  getById
}