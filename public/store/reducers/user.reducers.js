import { userFrontService } from "../../services/user.front.service.js"


export const SET_USER = 'SET_USER'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initalState = {
    user: userFrontService.getLoggedinUser(),
    isLoading: false,
}

export function userReducer(state = initalState, action = {}) {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: { ...action.currUser } }

        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }


        default:
            return state
    }

}
