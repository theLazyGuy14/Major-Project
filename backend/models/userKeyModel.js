const mongoose = require('mongoose')
const User = require('./userModel')

const userKeySchema = mongoose.Schema({    
    publicKey : String,
    privateKey : String,
    user : { type : mongoose.Schema.ObjectId, ref : 'User'}
},{
    timestamps : true
})

module.exports = mongoose.model('Key', userKeySchema)