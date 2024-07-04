import { userService } from "../services/user.service.js";
import { SET_USER, store } from "./store.js";

export function signup(credentials) {
    return userService.signup(credentials)
        .then(currUser => store.dispatch({ type: SET_USER, currUser }))
}

export function login(credentials) {
    return userService.login(credentials)
        .then(currUser => store.dispatch({ type: SET_USER, currUser }))
}

export function logout() {
    return userService.logout()
        .then(() => store.dispatch({ type: SET_USER, currUser: null }))
}