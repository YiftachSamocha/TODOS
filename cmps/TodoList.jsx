import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { removeTodo } from "../store/todo.actions.js"
import { TodoPreview } from "./TodoPreview.jsx"
const { Link } = ReactRouterDOM

export function TodoList({ todos }) {

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .then(() => {
                showSuccessMsg(`Todo removed`)
            })
            .catch(() => {
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }


    return (
        <ul className="todo-list">
            {todos.map(todo =>
                <li key={todo._id}>
                    <TodoPreview todo={todo}  />
                    <section>
                        <button onClick={() => onRemoveTodo(todo._id)}>Remove</button>
                        <button><Link to={`/todo/${todo._id}`}>Details</Link></button>
                        <button><Link to={`/todo/edit/${todo._id}`}>Edit</Link></button>
                    </section>
                </li>
            )}
        </ul>
    )
}