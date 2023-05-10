const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/fetcher')


const friendlistschma = new mongoose.Schema({
    user: String,
    friendlist: [String]
})
let friendlist = mongoose.model('friendlist', friendlistschma)


const createuser = (data) => {
    let a = { user: data }
    return friendlist.create(a)
}
const addfriend = (user, friend) => {
    return findfriendlist(user).then((data) => {
        let b
        data.forEach((a) => {
            if (a === friend) {
                b = a
            }
        })
        if (b) {
            return `${friend} is already in your friend list`
        } else {
            data.push(friend)
            return friendlist.updateOne({ user: `${user}` }, { friendlist: data })
        }

    })
}
const findfriendlist = (user) => {
    return friendlist.findOne({ user: `${user}` }).exec().then((friendlist) => {
        if (friendlist === null) {
            return null
        } else {
            return friendlist.friendlist
        }
    })
}
///////////////////////////////////////////////////////////////////////////////////////
const friendRequestListSchema = new mongoose.Schema({
    user: String,
    friendReqeust: [String]
})
let friendRequestList = mongoose.model('friendRequestList', friendRequestListSchema)
const createfriendrequestuser = (data) => {
    let a = { user: data }
    return friendRequestList.create(a)
}
const findfriendrequestlist = (user) => {
    return friendRequestList.findOne({ user: `${user}` }).exec().then((friendrequestlist) => {
        if (friendrequestlist === null) {
            return null
        } else {
            return friendrequestlist.friendReqeust
        }
    })
}
const addfriendrequest = (user, friend) => {
    return findfriendrequestlist(user).then((data) => {
        let b
        data.forEach((a) => {
            if (a === friend) {
                b = a
            }
        })
        if (b) {
            return `${friend} is already in your friendrequest list`
        } else {
            data.push(friend)
            return friendRequestList.updateOne({ user: `${user}` }, { friendReqeust: data })
        }

    })
}
const deletefriendrequest = (user, friend) => {
    return findfriendrequestlist(user).then((data) => {
        data = data.filter((a) => {
            return a !== friend
        })
        return friendRequestList.updateOne({ user: `${user}` }, { friendReqeust: data })
    })
}
////////////////////////////////////////////////////////////////////////////////////////////////////////
const messageStoreSchema = new mongoose.Schema({
    sender: String,
    recipient: String,
    message: String
}, { timestamps: true })
let messageStore = mongoose.model('messageStore', messageStoreSchema)

const createmessage = (sender1, recipient1, message1) => {
    return messageStore.create({
        sender: sender1,
        recipient: recipient1,
        message: message1
    })
}
const findmessage = (sender1, recipient1) => {
    return messageStore.find({ $or: [{ sender: `${sender1}`, recipient: `${recipient1}` }, { sender: `${recipient1}`, recipient: `${sender1}` }] })
}

module.exports = {
    createuser,
    addfriend,
    findfriendlist,
    createfriendrequestuser,
    findfriendrequestlist,
    addfriendrequest,
    deletefriendrequest,
    createmessage,
    findmessage
}

//db.chat_history.find({ $or: [{sender: "John", recipient: "Jane"}, {sender: "Jane", recipient: "John"}]})

// createfriendrequestuser('teet').then(() => {
//     return findfriendrequestlist('teet')
// }).then((a) => { console.log(a) })
// deletefriendrequest('teet', 'hahah').then((a) => {
//     console.log(a)
// })