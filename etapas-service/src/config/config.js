const knexSettings = {
  client: 'pg',
  connection: {
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB
  }
}

const serverSettings = {
  port: process.env.PORT
}

module.exports = Object.assign({}, { knexSettings, serverSettings })
