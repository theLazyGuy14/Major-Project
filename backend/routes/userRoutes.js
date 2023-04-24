const express = require('express')
const router = express.Router()
const { 
    registerUser, 
    loginUser, 
    getMe,
    addAttributes
} = require('../controllers/userController')
const { protect, ownerProtect } = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.post('/attributes',ownerProtect, addAttributes)

module.exports = router