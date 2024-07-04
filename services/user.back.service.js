import { utilService } from "../public/services/util.service.js"
import { utilBackService } from "./util.back.service.js"

export const userBackService = { signup, login }

var users = utilBackService.readJsonFile('./data/user.json')

function signup(user) {
    user.createdAt = Date.now()
    user._id = utilService.makeId()
    users.push(user)
    return utilBackService.writeJsonFile('./data/user.json', users)
        .then(() => {
            return {
                _id: user._id,
                fullname: user.fullname
            }
        })
}

function login(userToFind) {
    const foundUser = users.find(user => user.username === userToFind.username && user.password === userToFind.password)
    if (!foundUser) return Promise.reject('Wrong password or username')
    const userToSave = { _id: foundUser._id, fullname: foundUser.fullname }
    return Promise.resolve(userToSave)
}



