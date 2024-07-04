import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveTodo } from "../store/todo.actions.js"
import { todoFrontService } from "../services/todo.front.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function TodoEdit() {
    const [todoToEdit, setTodoToEdit] = useState(todoFrontService.getEmptyTodo())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.todoId) loadTodo()
    }, [])

    function loadTodo() {
        todoFrontService.getById(params.todoId)
            .then(setTodoToEdit)
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            default:
                break
        }

        setTodoToEdit(prevTodoToEdit => ({ ...prevTodoToEdit, [field]: value }))
    }

    function onSaveTodo(ev) {
        ev.preventDefault()
        saveTodo(todoToEdit)
            .then(() => {
                navigate('/todo')
                showSuccessMsg('Todo Saved')
            })
            .catch(() => {
                showErrorMsg('Cannot save todo')
            })
    }

    const { txt, importance, isDone } = todoToEdit



    return (
        <section className="todo-edit">
            <form onSubmit={onSaveTodo} >
                <label htmlFor="txt">Text:</label>
                <input onChange={handleChange} value={txt} type="text" name="txt" id="txt" />

                <label htmlFor="importance">Importance:</label>
                <input onChange={handleChange} value={importance} type="number" name="importance" id="importance" />

                <label htmlFor="isDone">isDone:</label>
                <input onChange={handleChange} checked={isDone} type="checkbox" name="isDone" id="isDone" />

                <button>Save</button>
            </form>
        </section>
    )
}