module.exports = app => {
    app.post('/signup', app.api.user.save) // um esta roteado o outro por cascade e assim fica mais simples fazer o acesso a todos os arquivos
    app.post('/signin', app.api.auth.signin)

    app.route('/tasks')
        .all(app.config.passport.authenticate())
        .get(app.api.task.getTasks)
        .post(app.api.task.save)
    app.route('/tasks/:id') //:id refere-se aos params (parametros) do id
        .all(app.config.passport.authenticate())
        .delete(app.api.task.remove)
    app.route('/tasksToggle/:id')
        .all(app.config.passport.authenticate())
        .put(app.api.task.toggleTask)
}