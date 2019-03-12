const bodyParser = require('body-parser')
const cors = require('cors')

module.exports = app => { //este é o mesmo app do index.js
    app.use(bodyParser.json())
    app.use(cors({
        origin: '*'
    }))
}