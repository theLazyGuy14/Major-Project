import { Schema, model } from 'mongoose'

const userSchema = Schema({
    name : {
        type : String,
        required : [true, ' Please add a name ']
    },
    email : {
        type : String,
        required : [true, 'Please add an email'],
        unique : true
    },
    password : {
        type : String,
        required : [true, 'Please add a password']
    },
    role : {
        type : String,
    },
    attributes : {
        type : Array
    }
},
{
    timestamps : true
})

export default model('User', userSchema)