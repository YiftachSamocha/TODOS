import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { removeTodo } from "../store/todo.actions.js"
import { TodoPreview } from "./TodoPreview.jsx"
const { Link } = ReactRouterDOM

export function TodoList({ todos }) {

    function onRemoveTodo(todoId) {
        const sure = confirm('Are you sure you want to remove this todo?')
        if (!sure) return
        removeTodo(todoId)
            .then(() => {
                showSuccessMsg(`Todo removed`)
            })
            .catch(() => {
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }

    if (todos.length === 0) return <div className="no-todos">No todos to show...</div>


    return (
        <ul className="todo-list">
            {todos.map(todo =>
                <li key={todo._id}>
                    <TodoPreview todo={todo} />
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