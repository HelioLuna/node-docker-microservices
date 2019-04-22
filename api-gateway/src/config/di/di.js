const { createContainer, asValue } = require('awilix')

const initDependencyInjection =({ serverSettings, dockerSettings, database }) => {
  return new Promise((resolve, reject) => {
    const container = createContainer()

    container.register({
      dockerSettings: asValue(dockerSettings),
      serverSettings: asValue(serverSettings),
      database: asValue(database),
    })

    resolve(container)
  })
}

module.exports.initDependencyInjection = initDependencyInjection