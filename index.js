const express = require('express')
const app = express()
const db = require('./config/db')
const consign = require('consign')

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.db = db // permite acesso ao knex para fazer alteraçoes , exclusoes etc

//app.get('/', (req, res, next) => {
//    console.log('Func 0')
//    next() // o next manda para frente a ultima função executada
//            // utilizado para criar uma cadeia (chain) de execução de funções
//            //São funções midlleware
//            //obs: sem o next() ao executar algo no browser nao passa para a proxima funçao
//})

app.listen(3000, () => {
    console.log('Backend executing...')
})