const { serverSettings } = require('./config')
const { initDependencyInjection } = require('./di')
const database = require('./knex')

const init = initDependencyInjection.bind(null, { serverSettings, database })

module.exports = Object.assign({}, { init })