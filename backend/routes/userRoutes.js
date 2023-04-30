const express = require('express')
const router = express.Router()
const { 
    registerUser, 
    loginUser, 
    getMe,
    addAttributes,
    generateAccessPolicy,
    decryptUserData  
} = require('../controllers/userController')
const { 
    protect, 
    ownerProtect,    
} = require('../middleware/authMiddleware')

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/me', protect, getMe)
router.post('/attributes',ownerProtect, addAttributes)
router.post('/policy',ownerProtect, generateAccessPolicy)
router.get('/decrypt', protect, decryptUserData)

module.exports = router