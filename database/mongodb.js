const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/fetcher')


const friendlistschma = new mongoose.Schema({
    user: String,
    friendlist: [String]
})

let friendlist = mongoose.model('friendlist', friendlistschma)

const createuser = (data) => {
    return friendlist.create(data)
}
const addfriend = (user, friend) => {

}

createuser({ user: 'hasha', friendlist: [] }).then((a) => {
    console.log(a)
})