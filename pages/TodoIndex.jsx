import { Loader } from "../cmps/Loader.jsx"
import { TodoFilter } from "../cmps/TodoFilter.jsx"
import { TodoList } from "../cmps/TodoList.jsx"
import { DataTable } from "../cmps/data-table/DataTable.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { SET_IS_LOADING } from "../store/store.js"
import { loadTodos } from "../store/todo.actions.js"

const { useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM
const { useSelector, useDispatch } = ReactRedux

export function TodoIndex() {
    const todos = useSelector(state => state.todos)
    const filterBy = useSelector(state => state.filterBy)
    const isLoading = useSelector(state => state.isLoading)

    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams()


    useEffect(() => {
        setSearchParams(filterBy)
        loadTodos(filterBy)
            .catch(() => {
                showErrorMsg('Cannot load todos')
            })
            .finally(() => dispatch({ type: SET_IS_LOADING, isLoading: false }))

    }, [filterBy])


    if (todos.length === 0) dispatch({ type: SET_IS_LOADING, isLoading: true })
    if (isLoading) return <Loader />
    return (
        <section className="todo-index">
            <TodoFilter />
            <div>
                <Link to="/todo/edit" className="btn" >Add Todo</Link>
            </div>
            <h2>Todos List</h2>
            <TodoList todos={todos} />
            <hr />
            <h2>Todos Table</h2>
            <div style={{ width: '60%', margin: 'auto' }}>
                <DataTable todos={todos} />
            </div>

        </section>
    )
}