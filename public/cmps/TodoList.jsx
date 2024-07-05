import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { removeTodo } from "../store/todo.actions.js"
import { updateUser } from "../store/user.actions.js"
import { TodoPreview } from "./TodoPreview.jsx"
const { Link } = ReactRouterDOM
const { useSelector } = ReactRedux

export function TodoList({ todos }) {
    const user = useSelector(state => state.user)

    function onRemoveTodo(todoId) {
        const sure = confirm('Are you sure you want to remove this todo?')
        if (!sure) return
        const deletedTodoTxt = todos.find(todo => todo._id === todoId).txt
        removeTodo(todoId)
            .then(() => {
                showSuccessMsg(`Todo removed`)
            })
            .then(() => {
                if (!user || Object.keys(user).length === 0) return
                const updatedUser = {
                    ...user,
                    activities: [...user.activities,
                    { action: 'Removed a todo', txt: deletedTodoTxt, at: new Date() }
                    ]
                }
                updateUser(updatedUser)
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