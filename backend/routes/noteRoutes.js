const express = require('express') 
const router = express.Router()
const {
     getNotes,
     setNote,
     deleteNote
} = require('../controllers/noteController')

const { ownerProtect } = require('../middleware/authMiddleware')

router.route('/').get(ownerProtect, getNotes).post(ownerProtect, setNote)
router.route('/:id').delete(ownerProtect, deleteNote)

module.exports = router 