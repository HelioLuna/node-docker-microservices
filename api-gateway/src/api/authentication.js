'use strict'

const status = require('http-status')

module.exports = ({ repository }, app) => {

  app.post('/autenticar', (req, res, next) => {
    repository.autenticar(req.body.login, req.body.senha)
      .then(token => {
        res.status(status.OK).json({ token: token })
      })
      .catch(err => {
        res.status(status.UNAUTHORIZED).send(err)
      })
  })
  
}
  