import { ADD_TODO, REMOVE_TODO, SET_TODOS, UPDATE_TODO, store } from "./store.js";
import { todoFrontService } from "../services/todo.front.service.js";

export function loadTodos(filterBy) {
    return todoFrontService.query(filterBy)
        .then(todos => store.dispatch({ type: SET_TODOS, todos }))
}

export function removeTodo(todoId) {
    return todoFrontService.remove(todoId)
        .then(() => store.dispatch({ type: REMOVE_TODO, todoId }))
}

export function saveTodo(todo) {
    const type = todo._id ? UPDATE_TODO : ADD_TODO
    return todoFrontService.save(todo)
        .then(savedTodo => store.dispatch({ type, todo: savedTodo }))

}