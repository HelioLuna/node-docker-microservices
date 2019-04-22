'use strict'

const status = require('http-status')

module.exports = ({ repository }, app) => {
  app.get('/denuncias', (req, res, next) => {
    repository.getListDenunciasByIds(req.query.id).then(denuncias => {
      res.status(status.OK).json(denuncias)
    }).catch(next)
  })

  app.get('/denuncias/:id', (req, res, next) => {
    repository.getDenunciaById(req.params.id).then(denuncia => {
      res.status(status.OK).json(denuncia)
    }).catch(next)
  })

  app.post('/denuncias', (req, res, next) => {
    const validate = req.container.cradle.validate
    
    validate(req.body, 'denuncia').then(denuncia => {
      repository.makeDenuncia(denuncia).then(insertedDenuncia => {
        res.status(status.OK).json(insertedDenuncia)
      })
    }).catch(next)
  })
}