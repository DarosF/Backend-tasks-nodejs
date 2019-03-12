const config = require('../knexfile.js') //require = padrão do node para importar um modulo
const knex = require('knex')(config)

knex.migrate.latest([config])
module.exports = knex                   // module = padrão do node para exportar qualquer coisa para fora dele