import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveTodo } from "../store/todo.actions.js"

export function TodoPreview({ todo }) {

    function onToggleTodo() {
        const updatedTodo = { ...todo, isDone: !todo.isDone }
        saveTodo(updatedTodo)
            .then(() => {
                showSuccessMsg(`Toggled successfully`)
            })
            .catch(() => {
                showErrorMsg('Cannot toggle todo ' + todoId)
            })
    }
    return (
        <article className="todo-preview" style={{ backgroundColor: todo.color }}>
            <h2 className={(todo.isDone) ? 'done' : ''} onClick={onToggleTodo}>
                Todo: {todo.txt}
            </h2>
            <h4>Todo Importance: {todo.importance}</h4>
            <img src={`../assets/img/${'todo'}.png`} alt="" />
        </article>
    )
}
