const denunciaSchema = (joi) => ({
  seq_denuncia: joi.number(),
  dsc_denuncia: joi.string().required(),
  nom_estabelecimento: joi.string().max(120).required(),
  seq_municipio: joi.number().required(),
  tip_situacao: joi.string().max(1).required(),
  dsc_endereco_estabelecimento: joi.string().max(120).required(),
  nom_denunciante: joi.string().max(120),
  num_telefone_denunciante: joi.string().max(15),
  dsc_email_denunciante: joi.string().max(120),
  dat_irregularidade: joi.date().required(),
  seq_setor_visa: joi.number(),
  seq_pessoa_usuario: joi.number(),
  seq_justificativa: joi.number(),
  dsc_complemento: joi.string().max(250),
  dth_registro: joi.date(),
  dth_alteracao: joi.date(),
  num_endereco: joi.string().max(5).required(),
  ind_estadual: joi.boolean()
})

module.exports = denunciaSchema