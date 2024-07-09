import { showErrorMsg, showSuccessMsg } from "../../services/event-bus.service.js"
import { removeTodo } from "../../store/actions/todo.actions.js"

const { useState, Fragment } = React
const { Link } = ReactRouterDOM

export function DataTableRow({ todo }) {

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .then(() => {
                showSuccessMsg(`Todo removed`)
            })
            .catch(err => {
                showErrorMsg('Cannot remove todo ' + todoId)
            })
    }

    const [isExpanded, setIsExpanded] = useState(false)

    return <Fragment>
        <tr>
            <td className="toggle-expand" onClick={() => {
                setIsExpanded(!isExpanded)
            }}>
                {(isExpanded) ? '-' : '+'}
            </td>
            <td>{todo._id}</td>
            <td className={(todo.isDone) ? 'done' : ''}>{todo.txt}</td>
            <td>{todo.importance}</td>
            <td>
                <Link to={`/todo/${todo._id}`}>Details</Link> |
                <Link to={`/todo/edit/${todo._id}`}>Edit</Link>
            </td>
        </tr>
        <tr hidden={!isExpanded}>
            <td colSpan="5" className="todo-info">
                <h5>{todo.txt}</h5>
                <img src={`https://robohash.org/${todo._id}`} style={{ maxWidth: '50px' }} />
                <p>{todo.txt}s are best for lorem ipsum dolor</p>
                <button onClick={() => onRemoveTodo(todo._id)}>Remove Todo</button>
            </td>
        </tr>
    </Fragment>
}
