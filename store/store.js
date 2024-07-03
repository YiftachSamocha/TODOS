const { createStore } = Redux

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const UPDATE_TODO = 'SAVE_TODO'
export const ADD_TODO = 'ADD_TODO'

const initalState = {
    todos: [],
    isLoading: false,
    filterBy: {},
    user: {},

}

function appReducer(state = initalState, action = {}) {
    switch (action.type) {
        case SET_TODOS:
            return { ...state, todos: action.todos }
        case REMOVE_TODO:
            var updatedTodos = state.todos.filter(todo => todo._id !== action.todoId)
            return { ...state, todos: updatedTodos }
        case UPDATE_TODO:
            var updatedTodos = state.todos.map(todo => todo._id === action.todo.id ? action.todo : todo)
            return { ...state, todos: updatedTodos }
        case ADD_TODO:
            return { ...state, todos: [...state.todos, action.todo] }

        default:
            return state
    }

}

export const store = createStore(appReducer)
window.gStore = store