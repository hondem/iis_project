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
    email: {
      type: 'string',
      required: true,
      format: 'email'
    },
    password: {
      type: 'string',
      required: true
    }
  }
}

const login : Object = {
  type: 'object',
  required: true,
  properties: {
    email: {
      type: 'string',
      required: true,
      format: 'email'
    },
    password: {
      type: 'string',
      required: true
    }
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
    email: {
      type: 'string',
      format: 'email'
    },
    authLevel: {
      type: 'string',
      enum: ['admin', 'accountant', 'user']
    }
  }
}

const changePassword: Object = {
  type: 'object',
  required: true,
  properties: {
    id: {
      type: 'number',
      required: true
    },
    password: {
      type: 'string',
      required: true
    }
  }
}

export default {
  getById,
  create,
  update,
  changePassword,
  login
}