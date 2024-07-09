const { useSelector } = ReactRedux
const { useEffect, useState } = React

export function AppFooter() {
    const todos = useSelector(state => state.todoModule.todos)
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

    return (
        <footer className="footer">
            <div>
                <h1>React Todo App</h1>
                {!isNaN(donePercent) && <p>Done todos: <span>{donePercent}%</span></p>}
            </div>
        </footer>
    )
}
