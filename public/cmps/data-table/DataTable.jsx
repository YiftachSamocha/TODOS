import { DataTableRow } from "./DataTableRow.jsx"

export function DataTable({ todos }) {
    if (todos.length === 0) return <div className="no-todos">No todos to show...</div>
    return <table border="1" className="data-table">
        <thead>
            <tr>
                <th style={{ width: '1em' }}>&nbsp;</th>
                <th style={{ width: '5em' }}>Id</th>
                <th>Text</th>
                <th>Importance</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {todos.map(todo =>
                <DataTableRow key={todo._id} todo={todo} />)}
        </tbody>
    </table>
}
