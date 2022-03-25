const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        min: 3,
        max: 256
    },
    username: {
        type: String,
        require: true,
        min: 3,
        max: 256
    },
    email: {
        type: String,
        require: true,
        min: 6,
        max: 256
    },
    password: {
        type: String,
        require: true,
        min: 6,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    }
})
// We have indicate the name of collection and we will export
module.exports = mongoose.model('users', userSchema)