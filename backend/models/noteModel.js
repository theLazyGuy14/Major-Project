const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    note : {
        type : String,
        required : [true, 'Note should have some content !']
    }
}, {
    timestamps : true
})

module.exports = mongoose.model('Notes', noteSchema)