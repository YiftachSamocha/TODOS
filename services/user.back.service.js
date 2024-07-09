import { utilService } from "../public/services/util.service.js"
import { utilBackService } from "./util.back.service.js"

export const userBackService = { signup, login, updateUser, getById }

var users = utilBackService.readJsonFile('./data/user.json')
_createData()

function signup(user) {
    user.createdAt = Date.now()
    user._id = utilService.makeId()
    user.balance = 0
    user.activities = [{ action: 'Signed up', txt: '', at: new Date() }]
    user.prefs = { color: '#000000', bgColor: '#ffffff' }

    users.push(user)
    return utilBackService.writeJsonFile('./data/user.json', users)
        .then(() => {
            return {
                _id: user._id,
                fullname: user.fullname,
                balance: user.balance,
                activities: user.activities,
                prefs: user.prefs
            }
        })
}

function login(userToFind) {
    const foundUser = users.find(user => user.username === userToFind.username && user.password === userToFind.password)
    if (!foundUser) return Promise.reject('Wrong password or username')
    const { _id, fullname, balance, activities, prefs } = foundUser
    const userToSave = { _id, fullname, balance, activities: activities.push({ action: 'Logged in', txt: '', at: new Date() }), prefs }
    return Promise.resolve(userToSave)
}

function updateUser(userToUpdate) {
    users = users.map(user => {
        if (userToUpdate._id === user._id) {
            const { balance, fullname, activities, prefs } = userToUpdate
            return { ...user, balance, fullname, activities, prefs }
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
                prefs: userToUpdate.prefs,
            }
        })
}

function getById(userId) {
    const foundUser = users.find(user => user._id === userId)
    const userToSend = {
        _id: foundUser._id,
        fullname: foundUser.fullname,
        balance: foundUser.balance,
        activities: foundUser.activities,
        prefs: foundUser.prefs,
    }
    return Promise.resolve(userToSend)


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
                activities: [{ action: 'Created by computer', txt: '', at: new Date() }],
                prefs: { color: '#000000', bgColor: '#ffffff' }

            }
            newUsers.push(user)
        }
        utilBackService.writeJsonFile('./data/user.json', newUsers)

    }
}





