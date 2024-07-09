import { Loader } from "../cmps/Loader.jsx"
import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { showErrorMsg } from "../services/event-bus.service.js"
import { loadTodos } from "../store/actions/todo.actions.js"
import { SET_IS_LOADING } from "../store/reducers/todo.reducers.js"

const { useEffect } = React
const { Link } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoIndex() {
    const todos = useSelector(state => state.todoModule.todos)
    const filterBy = useSelector(state => state.todoModule.filterBy)
    const isLoading = useSelector(state => state.todoModule.isLoading)

    const dispatch = useDispatch()

    useEffect(() => {
        loadTodos()
            .catch(() => {
                showErrorMsg('Cannot load todos')
            })
            .finally(() => dispatch({ type: SET_IS_LOADING, isLoading: false }))

    }, [filterBy])

    if (todos[0] === -1) dispatch({ type: SET_IS_LOADING, isLoading: true })
    if (isLoading) return <Loader />
    return (
        <section className="todo-index">
            <TodoFilter />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            {todos.length === 0 ? <div className="no-todos">No todos to show...</div> : <TodoList todos={todos} />}

            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} />
            </div>

        </section>
    )
}