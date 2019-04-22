'use strict'

const status = require('http-status')

module.exports = ({ repository }, app) => {

  app.get('/etapas', (req, res, next) => {
    repository.getAllEtapas()
      .then(etapas => {
        res.status(status.OK).json(etapas)
      })
      .catch(next)
  })

}