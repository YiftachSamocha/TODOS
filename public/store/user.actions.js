import { userFrontService } from "../services/user.front.service.js";
import { SET_USER, store } from "./store.js";

export function signup(credentials) {
    return userFrontService.signup(credentials)
        .then(currUser => store.dispatch({ type: SET_USER, currUser }))
}

export function login(credentials) {
    return userFrontService.login(credentials)
        .then(currUser => store.dispatch({ type: SET_USER, currUser }))
}

export function logout() {
    return userFrontService.logout()
        .then(() => store.dispatch({ type: SET_USER, currUser: null }))
}