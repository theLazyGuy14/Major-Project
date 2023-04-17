const express = require('express')
const router = express.Router()
const {
     getNotes,
     setNote,
     deleteNote
} = require('../controllers/noteController')

router.route('/').get(getNotes).post(setNote)

router.delete('/:id', deleteNote)

module.exports = router 