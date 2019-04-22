'use strict'

const express = require('express')
const proxy = require('http-proxy-middleware')
const spdy = require('spdy')
const logger = require('morgan')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const status = require('http-status')
const { verifyToken } = require('../lib/utils')
const openUrl = require('./open-url')
const _api = require('../api/authentication')

const start = (container) => {
  return new Promise((resolve, reject) => {
    const { port, ssl } = container.resolve('serverSettings')
    const routes = container.resolve('routes')
    const repository = container.resolve('repository')

    if (!repository) {
      reject(new Error('The server must be started with a connected repository'))
    }
    if (!routes) {
      reject(new Error('The server must be started with routes discovered'))
    }
    if (!port) {
      reject(new Error('The server must be started with an available port'))
    }

    const app = express()
    app.use(logger('dev'))
    app.use(bodyParser.json())
    app.use(cors())
    app.use(helmet())

    app.use((err, req, res, next) => {
      reject(new Error('Bad Gateway!, err:' + err))
      res.status(status.BAD_GATEWAY).json('url not found!')
      next()
    })
    
    app.use((req, res, next) => {
      const token = req.headers.authorization
      const service = req.originalUrl.split('/').splice(1)[0].split('?').splice(0)[0]

      let openRoute = false
      
      if (openUrl[service]) {
        openUrl[service].map(route => {
          if (matchRuleShort(req.originalUrl, route.url)) {
            if (route.methods.includes('ALL') || route.methods.includes(req.method)) {
              openRoute = true
            }
          }
        })
      }

      if (openRoute)
        return next()
      
      verifyToken(token)
        .then(decodedToken => {
          req.user = decodedToken.data
          next()
        })
        .catch(err => {
          res.status(status.UNAUTHORIZED).json('Token inválido fornecido')
        })
    })

    for (let id of Reflect.ownKeys(routes)) {
      const { route, target } = routes[id]

      app.use(route, proxy({
        target,
        changeOrigin: true,
        logLevel: 'debug',
        onProxyReq(proxyReq, req, res) {
          proxyReq.setHeader('user', req.user);
        }
      }))
    }

    const api = _api.bind(null, { repository })
    api(app)

    if (process.env.NODE === 'test') {
      const server = app.listen(port, () => resolve(server))
    } else {
      const server = spdy.createServer(ssl, app)
        .listen(port, () => resolve(server))
    }
  })

  //Short code
  function matchRuleShort(str, rule) {
    return new RegExp("^" + rule.split("*").join(".*") + "$").test(str);
  }
}

module.exports = Object.assign({}, { start })
