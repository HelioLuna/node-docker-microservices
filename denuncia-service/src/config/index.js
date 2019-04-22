const { knexSettings, serverSettings } = require('./config')
const { initDependencyInjection } = require('./di')
const models = require('../models')
const database = require('./knex')

const init = initDependencyInjection.bind(null, { serverSettings, database, models })

module.exports = Object.assign({}, { init })