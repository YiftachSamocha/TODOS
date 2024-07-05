import path from 'path'
import express, { json } from 'express'
import cookieParser from 'cookie-parser'
import { loggerService } from './services/logger.service.js'
import { todoBackService } from './services/todo.back.service.js'
import { userBackService } from './services/user.back.service.js'

const app = express()
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

app.get('/api/todo', (req, res) => {
    const filterBy = req.query
    todoBackService.query(filterBy)
        .then(todos => res.send(todos))
        .catch((err) => {
            loggerService.error('Cannot get todos', err)
            res.status(400).send('Cannot get todos')
        })
})
app.get('/api/todo/:id', (req, res) => {
    const { id } = req.params
    todoBackService.getById(id)
        .then(todo => res.send(todo))
        .catch((err) => {
            loggerService.error('Cannot get todo', err)
            res.status(400).send('Cannot get todo')
        })
})

app.put('/api/todo', (req, res) => {
    const { _id, txt, importance, isDone, updatedAt, createdAt, color } = req.body
    const todo = { _id, txt, importance: Number(importance), isDone, createdAt, updatedAt, color }
    todoBackService.save(todo)
        .then(updatedTodo => res.send(updatedTodo))
        .catch((err) => {
            loggerService.error('Cannot update todo', err)
            res.status(400).send('Cannot update todo')
        })

})

app.post('/api/todo', (req, res) => {
    const { txt, importance, isDone } = req.body
    const todo = { txt, importance: Number(importance), isDone }
    todoBackService.save(todo)
        .then(addedTodo => res.send(addedTodo))
        .catch((err) => {
            loggerService.error('Cannot add todo', err)
            res.status(400).send('Cannot add todo')
        })

})

app.delete('/api/todo/:id', (req, res) => {
    const { id } = req.params
    todoBackService.remove(id)
        .then(() => res.send('Removed!'))
        .catch((err) => {
            loggerService.error('Cannot remove todo', err)
            res.status(400).send('Cannot remove todo')
        })
})

//USER

app.post('/api/user/signup', (req, res) => {
    const userToSignup = req.body
    userBackService.signup(userToSignup)
        .then(user => res.send(user))
        .catch((err) => {
            loggerService.error('Cannot signup', err)
            res.status(400).send('Cannot signup')
        })
})

app.post('/api/user/login', (req, res) => {
    const userToLogin = req.body
    userBackService.login(userToLogin)
        .then(user => res.send(user))
        .catch((err) => {
            loggerService.error('Cannot login', err)
            res.status(400).send('Cannot login')
        })
})

app.put('/api/user/update', (req, res) => {
    const userToUpdate = req.body
    userBackService.updateUser(userToUpdate)
        .then(user => res.send(user))
        .catch((err) => {
            loggerService.error('Cannot update', err)
            res.status(400).send('Cannot update')
        })
})

app.delete('/api/user/logout', (req, res) => {
    res.send('Logged out!')
})



app.get('/**', (req, res) => {
    res.sendFile(path.resolve('public/index.html'))
})



const PORT = process.env.PORT || 3030

app.listen(PORT, () =>
    console.log(`Server listening on port http://127.0.0.1:${PORT}/`)

)
