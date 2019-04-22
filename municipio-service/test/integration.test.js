/* eslint-env mocha */
const supertest = require('supertest')
require('should')

describe('Municipio Service', () => {
  const api = supertest('http://localhost:3000')

  describe('/municipios', () => {
    it ('should return a list with all municipios', (done) => {
      api.get('/municipios').then(request => {
        request.body.should.be.an.Array()
        done()
      })
    })
  })
  
  describe('/municipios/uf/:uf', () => {
    it ('should return a list with municipios with cod_uf AL for :uf = AL', (done) => {
      api.get('/municipios/uf/AL').then(request => {
        request.body.should.be.an.Array()
        request.body.should.containDeepOrdered([
          {
            "seq_municipio": 1,
            "nom_municipio": "ÁGUA BRANCA",
            "cod_uf": "AL"
          },
          {
            "seq_municipio": 2,
            "nom_municipio": "ANADIA",
            "cod_uf": "AL"
          }
        ]);
        done()
      })
    })

    it ('should not return municipio ANADIA with cod_uf AC for :uf = AC', (done) => {
      api.get('/municipios/uf/AC').then(request => {
        request.body.should.be.an.Array()
        request.body.should.not.containDeepOrdered([
          {
            "seq_municipio": 2,
            "nom_municipio": "ANADIA",
            "cod_uf": "AL"
          }
        ]);
        done()
      })
    })
  })
  
  describe('/municipios/:id', () => {
    it ('should return a municipio Maceio with :id = 47', (done) => {
      api.get('/municipios/uf/AC').then(request => {
        request.body.should.not.containDeepOrdered(
          {
            "seq_municipio": 47,
            "nom_municipio": "MACEIÓ",
            "cod_uf": "AL"
          }
        )
        done()
      })
    })
  })
  
})