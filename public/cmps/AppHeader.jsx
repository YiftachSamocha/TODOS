const { Link, NavLink } = ReactRouterDOM
const { useSelector } = ReactRedux
const { useEffect, useState } = React


import { LoginSignup } from './LoginSignup.jsx'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/user.actions.js'



export function AppHeader() {
    const user = useSelector(state => state.user)
    const todos = useSelector(state => state.todos)

    const [donePercent, setDonePercent] = useState(null)

    useEffect(() => {
        getDonePercent(todos)
    }, [todos])

    function getDonePercent(todos) {
        const todosSum = todos.length
        const doneTodos = todos.filter(todo => todo.isDone)
        const doneTodosSum = doneTodos.length
        const percent = (doneTodosSum / todosSum) * 100
        setDonePercent(percent.toFixed(2))
    }



    function onLogout() {
        logout()
            .then(() => {
                showSuccessMsg('Logged out successfully')
            })
            .catch((err) => {
                showErrorMsg('OOPs try again')
            })
    }



    return (
        <header className="app-header full main-layout">
            <section className="header-container">
                <div>
                    <h1>React Todo App</h1>
                    {!isNaN(donePercent) && <p>Done todos: <span>{donePercent}%</span></p>}
                </div>


                {Object.keys(user).length !== 0 ? (
                    < section >

                        <Link to={`/user/${user._id}`}>Hello {user.fullname}</Link>
                        <button onClick={onLogout}>Logout</button>
                    </ section >
                ) : (
                    <section>
                        <LoginSignup />
                    </section>
                )}
                <nav className="app-nav">
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/about" >About</NavLink>
                    <NavLink to="/todo" >Todos</NavLink>
                    <NavLink to="/dashboard" >Dashboard</NavLink>
                </nav>
            </section>

        </header>
    )
}