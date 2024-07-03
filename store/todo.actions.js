import { ADD_TODO, REMOVE_TODO, SET_TODOS, UPDATE_TODO, store } from "./store.js";

import { todoService } from "../services/todo.service.js";

export function loadTodos() {
    return todoService.query()
        .then(todos => store.dispatch({ type: SET_TODOS, todos }))
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => store.dispatch({ type: REMOVE_TODO, todoId }))
}

export function saveTodo(todo) {
    if (todo._id) {
        return todoService.save(todo)
            .then(savedTodo => store.dispatch({ type: UPDATE_TODO, todo: savedTodo }))
    }
    else {
        return todoService.save(todo)
            .then(savedTodo => store.dispatch({ type: ADD_TODO, todo: savedTodo }))

    }

}