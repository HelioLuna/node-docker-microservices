/* eslint-env mocha */
const {validate} = require('./')

console.log(Object.getPrototypeOf(validate))

describe('Schemas Validation', () => {
  it('can validate a denuncia object', (done) => {
    const testDenuncia = {
      seq_denuncia: 93,
      dsc_denuncia: 'ASAWDASDASD',
      nom_estabelecimento: 'TESTE TELA CONSULTAR',
      seq_municipio: 3,
      tip_situacao: 'P',
      dsc_endereco_estabelecimento: 'AAAAA',
      nom_denunciante: 'MARCELO',
      num_telefone_denunciante: '546464',
      dsc_email_denunciante: '4546@TESTE.COM',
      dat_irregularidade: '2017-11-11T02:00:00.000Z',
      seq_pessoa_usuario: '3',
      seq_justificativa: 1,
      dth_registro: '2017-11-13T16:27:56.428Z',
      dth_alteracao: '2017-11-16T16:26:05.424Z',
      num_endereco: '69849',
      ind_estadual: true
    }

    validate(testDenuncia, 'denuncia')
      .then(value => {
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
})
