'use strict'

const unflatten = require('./utils')

const repository = (container) => {
  const { database: db } = container.cradle
  const schema = 'sc_ivs'

  const getListDenunciasByIds = (id = []) => {
    return new Promise((resolve, reject) => {
      db.withSchema(schema)
        .select(
          'ivs_denuncia.seq_denuncia',
          'ivs_denuncia.dsc_denuncia',
          'ivs_denuncia.nom_estabelecimento',
          'ivs_denuncia.seq_municipio',
          'ivs_denuncia.tip_situacao',
          'ivs_denuncia.dsc_endereco_estabelecimento',
          'ivs_denuncia.nom_denunciante',
          'ivs_denuncia.num_telefone_denunciante',
          'ivs_denuncia.dsc_email_denunciante',
          'ivs_denuncia.dat_irregularidade',
          'ivs_denuncia.seq_setor_visa',
          'ivs_denuncia.seq_pessoa_usuario',
          'ivs_justificativa.seq_justificativa as justificativa.seq_justificativa',
          'ivs_justificativa.dsc_justificativa as justificativa.dsc_justificativa',
          'ivs_denuncia.dsc_complemento',
          'ivs_denuncia.dth_registro',
          'ivs_denuncia.dth_alteracao',
          'ivs_denuncia.num_endereco',
          'ivs_denuncia.ind_estadual',
          'ivs_parecer_tecnico.seq_parecer_tecnico as parecer.seq_parecer_tecnico', 
          'ivs_parecer_tecnico.tip_parecer as parecer.tip_parecer', 
          'ivs_parecer_tecnico.dsc_parecer as parecer.dsc_parecer'
        )
        .from('ivs_denuncia')
        .leftJoin('ivs_servico_tecnico', 'ivs_denuncia.seq_denuncia', 'ivs_servico_tecnico.seq_denuncia')
        .leftJoin('ivs_parecer_tecnico', 'ivs_parecer_tecnico.seq_servico_tecnico', 'ivs_servico_tecnico.seq_servico_tecnico')
        .leftJoin('ivs_justificativa', 'ivs_denuncia.seq_justificativa', 'ivs_justificativa.seq_justificativa')
        .whereIn('ivs_denuncia.seq_denuncia', id)
        .then(denuncias => {
          denuncias.map((denuncia, index) => {
            denuncias[index] = unflatten(denuncia)
          })
          resolve(denuncias)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  const getDenunciaById = (id) => {
    return new Promise((resolve, reject) => {
      db.withSchema(schema)
        .first(
          'ivs_denuncia.seq_denuncia',
          'ivs_denuncia.dsc_denuncia',
          'ivs_denuncia.nom_estabelecimento',
          'ivs_denuncia.seq_municipio',
          'ivs_denuncia.tip_situacao',
          'ivs_denuncia.dsc_endereco_estabelecimento',
          'ivs_denuncia.nom_denunciante',
          'ivs_denuncia.num_telefone_denunciante',
          'ivs_denuncia.dsc_email_denunciante',
          'ivs_denuncia.dat_irregularidade',
          'ivs_denuncia.seq_setor_visa',
          'ivs_denuncia.seq_pessoa_usuario',
          'ivs_justificativa.seq_justificativa as justificativa.seq_justificativa',
          'ivs_justificativa.dsc_justificativa as justificativa.dsc_justificativa',
          'ivs_denuncia.dsc_complemento',
          'ivs_denuncia.dth_registro',
          'ivs_denuncia.dth_alteracao',
          'ivs_denuncia.num_endereco',
          'ivs_denuncia.ind_estadual',
          'ivs_parecer_tecnico.seq_parecer_tecnico as parecer.seq_parecer_tecnico', 
          'ivs_parecer_tecnico.tip_parecer as parecer.tip_parecer', 
          'ivs_parecer_tecnico.dsc_parecer as parecer.dsc_parecer'
        )
        .from('ivs_denuncia')
        .leftJoin('ivs_servico_tecnico', 'ivs_denuncia.seq_denuncia', 'ivs_servico_tecnico.seq_denuncia')
        .leftJoin('ivs_parecer_tecnico', 'ivs_parecer_tecnico.seq_servico_tecnico', 'ivs_servico_tecnico.seq_servico_tecnico')
        .leftJoin('ivs_justificativa', 'ivs_denuncia.seq_justificativa', 'ivs_justificativa.seq_justificativa')
        .where('ivs_denuncia.seq_denuncia', id)
        .then(denuncia => {
          denuncia = unflatten(denuncia)
          resolve(denuncia)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  const makeDenuncia = (denuncia) => {
    return new Promise((resolve, reject) => {
      const payload = {
        dsc_denuncia: denuncia.dsc_denuncia,
        nom_estabelecimento: denuncia.nom_estabelecimento,
        seq_municipio: denuncia.seq_municipio,
        tip_situacao: denuncia.tip_situacao,
        dsc_endereco_estabelecimento: denuncia.dsc_endereco_estabelecimento,
        nom_denunciante: denuncia.nom_denunciante,
        num_telefone_denunciante: denuncia.num_telefone_denunciante,
        dsc_email_denunciante: denuncia.dsc_email_denunciante,
        dat_irregularidade: denuncia.dat_irregularidade,
        seq_pessoa_usuario: denuncia.seq_pessoa_usuario,
        seq_justificativa: denuncia.seq_justificativa,
        dsc_complemento: denuncia.dsc_complemento,
        dth_registro: denuncia.dth_registro,
        dth_alteracao: denuncia.dth_alteracao,
        num_endereco: denuncia.num_endereco,
        ind_estadual: denuncia.ind_estadual
      }

      db.withSchema(schema)
        .insert(payload)
        .into('ivs_denuncia')
        .returning('*')
        .then(denuncia => {
          resolve(denuncia)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  return Object.create({
    getListDenunciasByIds,
    getDenunciaById,
    makeDenuncia
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