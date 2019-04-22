'use strict'

const status = require('http-status')

module.exports = ({ repository }, app) => {

  app.get('/notas', (req, res, next) => {
    if(req.headers.user != null && req.query.ano != null)
    {
      repository.getNotasByYear(req.headers.user, req.query.ano)
        .then(notas => {
          res.status(status.OK).json(notas)
        })
        .catch(next)
    }
    else 
    {
      res.status(500).send('Something went wrong with your request.');
    }
  })

}
