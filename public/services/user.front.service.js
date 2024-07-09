import { utilService } from "./util.service.js"

export const userFrontService = { signup, login, logout, updateUser, getLoggedinUser, getById, getEmptyUser, getEmptyCredentials }

const BASE_URL = '/api/user'
const STORAGE_KEY_LOGGEDIN = 'CURR USER:'

function signup(userToSignup) {
    return axios.post(BASE_URL + '/signup', userToSignup)
        .then(res => {
            const user = res.data
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
            return user
        })
}

function login(userToLogin) {
    return axios.post(BASE_URL + '/login', userToLogin)
        .then(res => {
            const user = res.data
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(user))
            return user
        })

}

function logout() {
    return axios.delete(BASE_URL + '/logout')
        .then(res => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
            return res.data
        })

}

function updateUser(userToUpdate) {
    return axios.put(BASE_URL + '/update', userToUpdate)
        .then(res => res.data)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN)) || {}
}

function getById(userId) {
    return axios.get(BASE_URL + '/' + userId)
        .then(res => res.data)
}

function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
    }
}

function getEmptyUser() {
    return {
        _id: utilService.makeId(),
        fullname: '',
        username: '',
        password: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        balance: 0,
        activities: [
            {
                txt: "Created by computer",
                at: new Date()
            }
        ],
        prefs: {
            color: "#000000",
            bgColor: "#ffffff"
        }
    }
}