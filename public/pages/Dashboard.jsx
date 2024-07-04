const { useEffect, useState } = React
import { Chart } from '../cmps/Chart.jsx'
import { todoFrontService } from '../services/todo.front.service.js'


export function Dashboard() {

    const [todos, setTodos] = useState([])
    const [importanceStats, setImportanceStats] = useState([])

    useEffect(() => {
        todoFrontService.query()
            .then(setTodos)
        todoFrontService.getImportanceStats()
            .then(setImportanceStats)
    }, [])


    return (
        <section className="dashboard">
            <h1>Dashboard</h1>
            <h2>Statistics for {todos.length} Todos</h2>
            <hr />
            <h4>By Importance</h4>
            <Chart data={importanceStats} />
        </section>
    )
}