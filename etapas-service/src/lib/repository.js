'use strict'

const repository = (container) => {
  const { database: db } = container.cradle
  const schema = 'sc_rhd'

  const getAllEtapas = () => {
    return new Promise((resolve, reject) => {
      db.withSchema(schema)
        .select(
          'rhd_etapa.cod_etapa',
          'rhd_etapa.dsc_etapa',
          'rhd_etapa.dsc_responsavel',
          'rhd_etapa.ind_ativo',
          'rhd_cronograma_etapa.dat_inicial_etapa',
          'rhd_cronograma_etapa.dat_final_etapa',
        )
        .from('rhd_etapa')
        .innerJoin('rhd_cronograma_etapa', 'rhd_cronograma_etapa.cod_etapa', 'rhd_etapa.cod_etapa')
        .orderBy('rhd_cronograma_etapa.dat_inicial_etapa', 'asc')
        .where('rhd_cronograma_etapa.num_ano', (new Date().getFullYear() - 1))
        .then(etapas => {
          resolve(etapas)
        }).catch(err => {
          reject(err)
        })
    })
  }


  return Object.create({
    getAllEtapas,
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