'use strict'

const express = require('express')
const logger = require('morgan')
const helmet = require('helmet')
const bodyparser = require('body-parser')
const cors = require('cors')
const _api = require('../api/notas')

const start = (container) => {
  return new Promise((resolve, reject) => {
    const { port } = container.resolve('serverSettings')
    const repository = container.resolve('repository')

    if (!repository) {
      reject(new Error('The server must be started with a connected repository'))
    }
    if (!port) {
      reject(new Error('The server must be started with a available port'))
    }

    const app = express()
    app.use(logger('dev'))
    app.use(bodyparser.json())
    app.use(cors())
    app.use(helmet())
    app.use((err, req, res, next) => {
      reject(new Error('Something went wrong!, err: ' + err))
      res.status(500).send('Something went wrong!')
      next()
    })
    app.use((req, res, next) => {
      req.container = container.createScope()
      next()
    })

    const api = _api.bind(null, { repository })
    api(app)

    const server = app.listen(port, () => resolve(server))
  })
}

module.exports = Object.assign({}, { start })