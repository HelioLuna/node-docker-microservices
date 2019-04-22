'use strict'

const repository = (container) => {
  const { database: db } = container.cradle
  const schema = 'sc_scg'

  const getAllMunicipios = () => {
    return new Promise((resolve, reject) => {
      db.withSchema(schema)
        .select(
          'seq_municipio',
          'nom_municipio',
          'cod_uf'
        )
        .from('scg_municipio')
        .then(municipios => {
          resolve(municipios)
        }).catch(err => {
          reject(err)
        })
    })
  }

  const getMunicipiosByUf = (uf) => {
    return new Promise((resolve, reject) => {
      db.withSchema(schema)
        .select(
          'seq_municipio',
          'nom_municipio',
          'cod_uf'
        )
        .from('scg_municipio')
        .where('cod_uf', uf)
        .then(municipios => {
          resolve(municipios)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  const getMunicipioById = (id) => {
    return new Promise((resolve, reject) => {
      db.withSchema(schema)
        .first(
          'seq_municipio',
          'nom_municipio',
          'cod_uf'
        )
        .from('scg_municipio')
        .where('seq_municipio', id)
        .then(municipio => {
          resolve(municipio)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  return Object.create({
    getAllMunicipios,
    getMunicipiosByUf,
    getMunicipioById
  })
}

const connect = (container) => {
  return new Promise((resolve, reject) => {
    if (!container.resolve('database')) {
      reject(new Error('connection db not supplied'))
    }
    resolve(repository(container))
  })
}

module.exports = Object.assign({}, { connect })