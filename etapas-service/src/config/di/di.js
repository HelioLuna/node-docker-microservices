const { createContainer, asValue } = require('awilix')

const initDependencyInjection =({ serverSettings, database}) => {
  return new Promise((resolve, reject) => {
    const container = createContainer()

    container.register({
      database: asValue(database),
      serverSettings: asValue(serverSettings)
    })

    resolve(container)
  })
}

module.exports.initDependencyInjection = initDependencyInjection