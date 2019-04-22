const { createContainer, asValue } = require('awilix')

const initDependencyInjection =({ serverSettings, database, models }) => {
  return new Promise((resolve, reject) => {
    const container = createContainer()

    container.register({
      database: asValue(database),
      validate: asValue(models.validate),
      serverSettings: asValue(serverSettings),
      denuncia: asValue(models.denuncia)
    })

    resolve(container)
  })
}

module.exports.initDependencyInjection = initDependencyInjection