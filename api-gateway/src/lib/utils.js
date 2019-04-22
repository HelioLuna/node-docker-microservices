'use strict'

const crypto = require('crypto')
const jwt = require('jsonwebtoken')

const JWT_SECRET = '9UH9307350F3H0H9239h(h(**_)#h(*f9HUFEW9HR4U9HQ24N'

const generateToken = (id) => {
  let token = jwt.sign({
    data: id
  }, JWT_SECRET, {
    expiresIn: '1d',
    algorithm: 'HS256'
  })
  
  return token
}

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token.replace(/^Bearer\s/, ''), JWT_SECRET, (err, decodedToken) => {
      if (err || !decodedToken)
        reject(err)
      
      resolve(decodedToken)
    })
  })
}

const verifyPassword = (password, passwordHash) => {
  return passwordHash === crypto.createHash('md5').update(password).digest('hex')
}

module.exports = { generateToken, verifyPassword, verifyToken }