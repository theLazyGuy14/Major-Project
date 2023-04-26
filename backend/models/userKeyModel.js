const mongoose = require('mongoose')
const User = require('./userModel')

const userKeySchema = mongoose.Schema({    
    publicKey : String,
    privateKey : String,
    _id : { type : mongoose.Schema.ObjectId, ref : 'User'}
},{
    timestamps : true
})

module.exports = mongoose.model('Key', userKeySchema)