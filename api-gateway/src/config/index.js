const { dockerSettings, serverSettings } = require('./config')
const { initDependencyInjection } = require('./di')
const database = require('./knex')

const init = initDependencyInjection.bind(null, { serverSettings, dockerSettings, database })

module.exports = Object.assign({}, { init })