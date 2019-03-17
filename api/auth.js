const { authSecret } = require('../.env') //gera chave jwt (token) para logar
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const signin = async (req, res) => { //login
        if (!req.body.email || !req.body.password) {
            return res.status(400).send('Imcomplete Datas')
        }

        const user = await app.db('users')
            .whereRaw("LOWER(email) = LOWER(?)", req.body.email) //para ignorar letrar maisculas ou minusculas no momento do login...
            .first()

        if (user) {
            bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
                if (err || !isMatch) {
                    return res.status(401).send()
                }

                const payload = { id: user.id }
                res.json({
                    name: user.name,
                    email: user.email,
                    token: jwt.encode(payload, authSecret), //token validado com o authSecret
                })
            })
        } else {
            res.status(400).send('User not found!')
        }
    }
    return { signin }
}