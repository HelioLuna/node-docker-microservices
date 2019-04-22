'use strict'

const { asValue } = require('awilix')
const server = require('./server/server')
const docker = require('./docker/docker')
const repository = require('./lib/repository')
const dependencyInjection = require('./config')

console.log('--- API Gateway ---')
console.log('Connecting to API repository')

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

dependencyInjection.init().then(container => {
  Promise.all([
    docker.discoverRoutes(container),
    repository.connect(container)
  ])
  .then(([routes, repository]) => {
    console.log('Connected. Starting Server')
    container.register('routes', asValue(routes))
    container.register('repository', asValue(repository))
    return server.start(container)
  })
  .then(app => {
    console.log(`Connected to Docker: ${container.cradle.dockerSettings.host}`)
    console.log(`Server started succesfully, API Gateway running on port: ${container.cradle.serverSettings.port}.`)
    app.on('close', () => {
      console.log('Server finished')
    })
  })
})