const bcrypt = require('bcrypt-nodejs')

module.exports = app => {
    const obterHash = (password, callback) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, null, (err, hash) => callback(hash))
        }) //numero de rodada para executar os dados
    }
    const save = (req, res) => {
        obterHash(req.body.password, hash => {
            const password = hash // para nao salvar a senha pura e sim um hash dela

            app.db('users')
                .insert({ name: req.body.name, email: req.body.email, password })
                .then(_ => res.status(204).send()) //quando der sucesso de acesso
                .catch(err => res.status(400).json(err))
        })
    }
    return { save } //retorna o save para ser acessado de fora  
}