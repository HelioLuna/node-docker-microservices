const config = require('./config')
const knex = require('knex')

const database = knex(config.knexSettings)

module.exports = database
