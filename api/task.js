const moment = require('moment')

module.exports = app => {
    const getTasks = (req, res) => {
        const date = req.query.date ? req.query.date
            : moment().endOf('day').toDate() //pega o final do dia

        app.db('tasks')
            .where({ userId: req.user.id })
            .where('estimateAt', '<=', date)
            .orderBy('estimateAt')
            .then(tasks => res.json(tasks))//converte para json e manda para a requisicao
            .catch(err => res.status(400).json(err))
    }

    const save = (req, res) => { //método
        if (!req.body.desc.trim()) {//se a descricao nao estiver presente
            return res.status(400).send('Description is required...')
        }

        req.body.userId = req.user.id

        app.db('tasks')
            .insert(req.body) // a nomenclatura ser mantida é bom pois faz com que não precisamos fazer um de/para exemplo: no banco e nos objetos js
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const remove = (req, res) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id }) //faz a exclusao do usuario que esta no request ou logado no momento.
            .del()
            .then(rowsDeleted => {
                if (rowsDeleted > 0) {
                    res.status(204).send()
                } else {
                    const msg = `Can't find task with id ${req.params.id}.`
                    res.status(400).send(msg)
                }
            })
            .catch(err => res.status(400).json(err))
    }

    const updateTaskDoneAt = (req, res, doneAt) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .update({ doneAt })
            .then(_ => res.status(204).send())
            .catch(err => res.status(400).json(err))
    }

    const toggleTask = (req, res) => {
        app.db('tasks')
            .where({ id: req.params.id, userId: req.user.id })
            .first()
            .then(task => {
                if (!task) {
                    const msg = `Task id: ${req.params.id} can't find.`
                    return res.status(400).send(msg)
                }

                const doneAt = task.doneAt ? null : new Date()
                updateTaskDoneAt(req, res, doneAt)
            })
            .catch(err => res.status(400).json(err))
    }
    return { getTasks, save, remove, toggleTask } // As 4 funções que a aplicação em react-native vai preisar daqui do backend
}