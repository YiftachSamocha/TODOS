export const userFrontService = { signup, login, logout, updateUser, getEmptyCredentials }

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

function getEmptyCredentials() {
    return {
        fullname: '',
        username: '',
        password: '',
    }
}