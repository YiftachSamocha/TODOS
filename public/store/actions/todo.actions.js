import { todoFrontService } from "../../services/todo.front.service.js";
import { ADD_TODO, REMOVE_TODO, SET_TODOS, UPDATE_TODO } from "../reducers/todo.reducers.js";
import { store } from "../store.js";

export function loadTodos() {
    const filterBy = store.getState().todoModule.filterBy
    return todoFrontService.query(filterBy)
        .then(todos => store.dispatch({ type: SET_TODOS, todos }))
        .catch(err => {
            console.log('car action -> Cannot load todos', err)
            throw err
        })
}

export function removeTodo(todoId) {
    return todoFrontService.remove(todoId)
        .then(() => store.dispatch({ type: REMOVE_TODO, todoId }))
        .catch(err => {
            console.log('car action -> Cannot remove todo', err)
            throw err
        })
}

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoFrontService.save(todo)
        .then(savedTodo => store.dispatch({ type, todo: savedTodo }))
        .catch(err => {
            console.log('car action -> Cannot save todo', err)
            throw err
        })
}