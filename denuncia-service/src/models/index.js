const joi = require('joi')
const denuncia = require('./denuncia.model')(joi)

const schemas = Object.create({denuncia})

const schemaValidator = (object, type) => {
  return new Promise((resolve, reject) => {
    if (!object) {
      reject(new Error('object to validate is not provided'))
    }
    if (!type) {
      reject(new Error('schema type to validate is not provided'))
    }

    const {error, value} = joi.validate(object, schemas[type])

    if (error) {
      reject(new Error(`invalide ${type} data, err: ${error}`))
    }
    resolve(value)
  })
}

module.exports = Object.create({ validate: schemaValidator, schemas })
