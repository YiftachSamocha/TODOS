import { utilService } from "../public/services/util.service.js"
import { utilBackService } from "./util.back.service.js"

export const userBackService = { signup, login, updateUser }

var users = utilBackService.readJsonFile('./data/user.json')
_createData()

function signup(user) {
    user.createdAt = Date.now()
    user._id = utilService.makeId()
    user.balance = 0
    user.activities = [{ txt: 'Signed up', at: new Date() }]

    users.push(user)
    return utilBackService.writeJsonFile('./data/user.json', users)
        .then(() => {
            return {
                _id: user._id,
                fullname: user.fullname,
                balance: user.balance,
                activities: user.activities
            }
        })
}

function login(userToFind) {
    const foundUser = users.find(user => user.username === userToFind.username && user.password === userToFind.password)
    if (!foundUser) return Promise.reject('Wrong password or username')
    const { _id, fullname, balance, activities } = foundUser
    const userToSave = { _id, fullname, balance, activities }
    console.log(userToSave)
    return Promise.resolve(userToSave)
}

function updateUser(userToUpdate) {
    users = users.map(user => {
        if (userToUpdate._id === user._id) {
            const { balance, activities } = userToUpdate
            return { ...user, balance, activities }
        }
        else return user
    })
    return utilBackService.writeJsonFile('./data/user.json', users)
        .then(() => {
            return {
                _id: userToUpdate._id,
                fullname: userToUpdate.fullname,
                balance: userToUpdate.balance,
                activities: userToUpdate.activities,
            }
        })
}

function _createData(length = 6) {
    if (!users || users.length === 0) {
        let newUsers = []
        for (var i = 0; i < length; i++) {
            const user = {
                _id: utilService.makeId(),
                fullname: utilService.makeLorem(1),
                username: utilService.makeLorem(1),
                password: utilService.makeLorem(1),
                createdAt: new Date(),
                updatedAt: new Date(),
                balance: 0,
                activities: [{ txt: 'Created by computer', at: new Date() }]
            }
            newUsers.push(user)
        }
        utilBackService.writeJsonFile('./data/user.json', newUsers)

    }
}





