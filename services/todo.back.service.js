import { utilService } from "../public/services/util.service.js"
import { utilBackService } from "./util.back.service.js"


export const todoBackService = { query, remove, getById, save }

var todos = utilBackService.readJsonFile('./data/todo.json')
const PAGE_SIZE = 6
_createTodos()

function query(filterBy) {
    let todosToSend = [...todos]
    if (!filterBy || Object.keys(filterBy).length === 0) return Promise.resolve(todosToSend)
    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        todosToSend = todosToSend.filter(todo => regExp.test(todo.txt))
    }

    if (filterBy.importance) {
        todosToSend = todosToSend.filter(todo => todo.importance >= filterBy.importance)
    }

    if (filterBy.type === 'done') {
        todosToSend = todosToSend.filter(todo => todo.isDone)
    }

    if (filterBy.sort === 'txt') {
        todosToSend = todosToSend.sort((a, b) => a.txt.localeCompare(b.txt))
    }

    if (filterBy.sort === 'importance') {
        todosToSend = todosToSend.sort((a, b) => a.importance - b.importance)
    }

    if (filterBy.sort === 'createdAt') {
        todosToSend = todosToSend.sort((a, b) => b.createdAt - a.createdAt)
    }

    const startIdx = PAGE_SIZE * filterBy.page - PAGE_SIZE
    todosToSend = todosToSend.slice(startIdx, startIdx + PAGE_SIZE)

    return Promise.resolve(todosToSend)

}

function remove(todoId) {
    const idx = todos.findIndex(todo => todo._id === todoId)
    todos.splice(idx, 1)
    return _saveTodosToFile()

}

function getById(todoId) {
    const todoToFind = todos.find(todo => todo._id === todoId)
    return Promise.resolve(todoToFind)
}

function save(todoToSave) {
    if (todoToSave._id) {
        todoToSave.updatedAt = Date.now()
        todos = todos.map(todo => {
            if (todo._id === todoToSave._id) return todoToSave
            else return todo
        })

    } else {
        todoToSave.createdAt = todoToSave.updatedAt = Date.now()
        todoToSave._id = utilService.makeId()
        todos.push(todoToSave)
    }
    return _saveTodosToFile().then(() => todoToSave)
}

function getEmptyTodo(txt = '', importance = 5) {
    return { txt, importance, isDone: false }
}

function _createTodos() {
    if (todos && todos.length) return
    todos = []
    const txts = ['Learn React', 'Master CSS', 'Practice Redux']
    for (let i = 0; i < 20; i++) {
        const txt = txts[utilService.getRandomIntInclusive(0, txts.length - 1)]
        todos.push(_createTodo(txt + (i + 1), utilService.getRandomIntInclusive(1, 10)))
    }
    return _saveTodosToFile()

}

function _createTodo(txt, importance) {
    const todo = getEmptyTodo(txt, importance)
    todo._id = utilService.makeId()
    todo.createdAt = todo.updatedAt = Date.now() - utilService.getRandomIntInclusive(0, 1000 * 60 * 60 * 24)
    todo.color = _getRandomColor()
    return todo
}

function _getRandomColor() {
    const colors = [
        "#ffd1dc",
        "#aec6cf",
        "#c3e8a8",
        "#fdfd96",
        "#caa9fa",
        "#ffb347",
        "#baffc9",
        "#ffb3ba",
        "#e6e6fa",
        "#ffdcb3"
    ]
    const randomIndex = Math.floor(Math.random() * colors.length)
    return colors[randomIndex]
}

function _saveTodosToFile() {
    return utilBackService.writeJsonFile('./data/todo.json', todos)
}