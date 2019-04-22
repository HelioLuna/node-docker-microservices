'use strict'

const status = require('http-status')

module.exports = ({ repository }, app) => {
  app.get('/municipios', (req, res, next) => {
    repository.getAllMunicipios()
      .then(municipios => {
        res.status(status.OK).json(municipios)
      })
      .catch(next)
  })

  app.get('/municipios/uf/:uf', (req, res, next) => {
    repository.getMunicipiosByUf(req.params.uf)
      .then(municipios => {
        res.status(status.OK).json(municipios)
      })
      .catch(next)
  })

  app.get('/municipios/:id', (req, res, next) => {
    repository.getMunicipioById(req.params.id)
      .then(municipios => {
        res.status(status.OK).json(municipios)
      })
      .catch(next)
  })
}