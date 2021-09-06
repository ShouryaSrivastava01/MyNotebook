const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String,
    gender: String,
    body: Object,
    share: Object,
})

module.exports = mongoose.model('tests', userSchema)