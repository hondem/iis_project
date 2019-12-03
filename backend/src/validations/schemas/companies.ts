const getById : Object = {
  type: 'object',
  required: true,
  properties: {
    id: {
      type: 'number',
      required: true
    }
  }
}

const create : Object = {
  type: 'object',
  required: true,
  properties: {
    name: {
      type: 'string',
      required: true,
    },
  }
}

const update : Object = {
  type: 'object',
  required: true,
  properties: {
    id: {
      type: 'number',
      required: true
    },
    name: {
      type: 'string',
      required: true,
    },
  }
}

export default {
  getById,
  create,
  update
}