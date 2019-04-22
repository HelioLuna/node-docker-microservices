'use strict'

const { asValue } = require('awilix')
const server = require('./server/server')
const repository = require('./lib/repository')
const dependencyInjection = require('./config')

console.log('--- Municipio Service ---')
console.log('Connecting to municipio repository')

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

dependencyInjection.init().then(container => {
  repository.connect(container)
    .then(repository => {
      console.log('Connected. Starting Server')
      container.register('repository', asValue(repository))
      return server.start(container)
    })
    .then(app => {
      console.log(`Server started succesfully, running on port: ${container.cradle.serverSettings.port}.`)
    })
})