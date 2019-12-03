'use strict'

module.exports = {

  extends: [
    '@strv/eslint-config-node',
    '@strv/eslint-config-typescript',
  ],

  parserOptions: {
    project: './tsconfig.json',
  },

  rules: {
    "import/no-unused-modules": "off"
  }
}