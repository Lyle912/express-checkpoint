const knex = require('knex')
const knexfile = require('../knexfile')

const environment = process.env.NODE_ENV

const configuredEnvironment = knexfile[environment] || knexfile['development']

module.exports = knex(configuredEnvironment)