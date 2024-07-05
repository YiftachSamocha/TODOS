export const todoFrontService = { query, remove, getById, save, getEmptyTodo, getImportanceStats }

const BASE_URL = '/api/todo'

function query(filterBy) {
    return axios.get(BASE_URL, { params: filterBy })
        .then(res => res.data)
}

function remove(todoId) {
    return axios.delete(BASE_URL + '/' + todoId)
        .then(res => res.data)
}

function getById(todoId) {
    return axios.get(BASE_URL + '/' + todoId)
        .then(res => {
            let todo = res.data
            return _setNextPrevTodoId(todo)
        })
}

function save(todoToSave) {
    if (todoToSave._id) {
        return axios.put(BASE_URL, todoToSave)
            .then(res => res.data)
    }
    else {
        return axios.post(BASE_URL, todoToSave)
            .then(res => {
                return res.data
            })
    }
}

function getEmptyTodo(txt = '', importance = 5, color = '#ffffff') {
    return { txt, importance, isDone: false, color }
}

function getImportanceStats() {
    return axios.get(BASE_URL, { params: {} })
        .then(res => {
            const todos = res.data
            const todoCountByImportanceMap = _getTodoCountByImportanceMap(todos)
            const data = Object.keys(todoCountByImportanceMap).map(speedName => ({ title: speedName, value: todoCountByImportanceMap[speedName] }))
            return data
        })

}

function _setNextPrevTodoId(todo) {
    return axios.get(BASE_URL, { params: {} })
        .then((res) => {
            const todos = res.data
            const todoIdx = todos.findIndex((currTodo) => currTodo._id === todo._id)
            const nextTodo = todos[todoIdx + 1] ? todos[todoIdx + 1] : todos[0]
            const prevTodo = todos[todoIdx - 1] ? todos[todoIdx - 1] : todos[todos.length - 1]
            todo.nextTodoId = nextTodo._id
            todo.prevTodoId = prevTodo._id
            return todo
        })
}

function _getTodoCountByImportanceMap(todos) {
    const todoCountByImportanceMap = todos.reduce((map, todo) => {
        if (todo.importance < 3) map.low++
        else if (todo.importance < 7) map.normal++
        else map.urgent++
        return map
    }, { low: 0, normal: 0, urgent: 0 })
    return todoCountByImportanceMap
}