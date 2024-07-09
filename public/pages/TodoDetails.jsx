import { showErrorMsg } from "../services/event-bus.service.js"
import { Loader } from "../cmps/Loader.jsx"
import { todoFrontService } from "../services/todo.front.service.js"
import { SET_IS_LOADING } from "../store/reducers/todo.reducers.js"

const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoDetails() {

    const [todo, setTodo] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    const isLoading = useSelector(state => state.todoModule.isLoading)
    const dispatch = useDispatch()

    useEffect(() => {
        loadTodo()
    }, [params.todoId])


    function loadTodo() {
        todoFrontService.getById(params.todoId)
            .then(setTodo)
            .catch(() => {
                showErrorMsg('Cannot load todo')
                navigate('/todo')
            })
            .finally(() => dispatch({ type: SET_IS_LOADING, isLoading: false }))

    }

    function onBack() {
        navigate('/todo')
    }

    if (!todo) dispatch({ type: SET_IS_LOADING, isLoading: true })
    if (isLoading) return <Loader />

    return (
        <section className="todo-details" style={{ backgroundColor: todo.color }}>
            <h1 className={(todo.isDone) ? 'done' : ''}>{todo.txt}</h1>
            <h2>{(todo.isDone) ? 'Done!' : 'In your list'}</h2>

            <h1>Todo importance: {todo.importance}</h1>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim rem accusantium, itaque ut voluptates quo? Vitae animi maiores nisi, assumenda molestias odit provident quaerat accusamus, reprehenderit impedit, possimus est ad?</p>
            <button onClick={onBack}>Back to list</button>
            <div>
                <Link to={`/todo/${todo.prevTodoId}`}>Previous Todo</Link>
                <Link to={`/todo/${todo.nextTodoId}`}>Next Todo</Link>
            </div>
        </section>
    )
}