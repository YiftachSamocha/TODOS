import { SET_FILTER_BY } from "../store/store.js"

const { useState, useEffect } = React
const { useSelector, useDispatch } = ReactRedux

export function TodoFilter() {
    const filterBy = useSelector(state => state.filterBy)
    const dispatch = useDispatch()


    function onSetFilterBy(filterBy) {
        dispatch({ type: SET_FILTER_BY, filterBy })
    }

    const [filterByToEdit, setFilterByToEdit] = useState({
        txt: filterBy.txt || '',
        importance: filterBy.importance || '',
        type: filterBy.type || 'all',
    })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

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


            default: break
        }

        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }


    const { txt, importance, type } = filterByToEdit
    return (
        <section className="todo-filter">
            <h2>Filter Todos</h2>
            <form>
                <label htmlFor="txt">Text </label>
                <input value={txt} onChange={handleChange}
                    type="search" placeholder="By Txt" id="txt" name="txt"
                />
                <label htmlFor="importance">Importance: </label>
                <input value={importance} onChange={handleChange}
                    type="number" placeholder="By Importance" id="importance" name="importance"
                />
                <label htmlFor="type">Type</label>
                <select name="type" id="type" value={type} onChange={handleChange}>
                    <option value="all">All</option>
                    <option value="done">Done</option>
                    <option value="active">Active</option>
                </select>

            </form>
        </section>
    )
}