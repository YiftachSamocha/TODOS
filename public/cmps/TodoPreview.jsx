import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveTodo } from "../store/actions/todo.actions.js"
import { updateUser } from "../store/actions/user.actions.js"

const { useState, useEffect } = React
const { useSelector } = ReactRedux

export function TodoPreview({ todo }) {
    const [isDone, setIsDone] = useState(false)
    const user = useSelector(state => state.userModule.user)

    useEffect(() => {
        if (todo.isDone) setIsDone(true)
    }, [])

    function onToggleTodo() {
        const updatedTodo = { ...todo, isDone: !todo.isDone }
        saveTodo(updatedTodo)
            .then(() => {
                setIsDone(!isDone)
                showSuccessMsg(`Toggled successfully`)
            })
            .then(() => {
                if (!user || Object.keys(user).length === 0) return
                const isCompleted = isDone ? 'Unompleted' : 'Completed'
                const updatedUser = {
                    ...user,
                    balance: isDone ? user.balance : user.balance + 10,
                    activities: [...user.activities, { action: isCompleted + ' a todo', txt: updatedTodo.txt, at: new Date() }]
                }
                updateUser(updatedUser)
            })
            .catch(() => {
                showErrorMsg('Cannot toggle todo ' + todoId)
            })
    }
    return (
        <article className="todo-preview" style={{ backgroundColor: todo.color }}>
            <h2 className={(isDone) ? 'done' : ''} onClick={onToggleTodo}>
                Todo: {todo.txt}
            </h2>
            <h4>Todo Importance: {todo.importance}</h4>
            <img src={`../assets/img/${'todo'}.png`} alt="" />
        </article>
    )
}
