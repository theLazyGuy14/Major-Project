const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jexl = require('jexl')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body    

    if(!name || !email || !password) {
        res.status(400)
        throw new Error(' Please add all fields ')
    }

    // Check if user exists
    const userExists = await User.findOne({email})

    if(userExists) {
        res.status(400)
        throw new Error(' User already exists... ')
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt) 

    // Create user
    const user = await User.create({
        name,
        email,
        password : hashedPassword,        
    })

    if(user) {
        res.status(201).json({
            _id : user.id,
            name : user.name,
            email : user.email,  
            token : generateToken(user._id)          
        })
    }
    else {
        res.status(400)
        throw new Error(' Invalid user data ')
    }    
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {

    const {email, password} = req.body

    //Check for user email
    const user = await User.findOne({email})
    if(user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id : user.id,
            name : user.name,
            email : user.email,
            token : generateToken(user._id),
            attributes : user.attributes
        })
    }
    else {
        res.status(400)
        throw new Error(' Invalid credentials ')
    }    
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    const {_id, name, email } = await User.findById(req.user.id)

    res.status(200).json({
        id : _id,
        name,
        email
    })
})

// @desc    Add attributes to users
// @route   POST /api/users/attributes
// @access  Private
const addAttributes = asyncHandler(async (req, res) => {
    
    const personId = req.body.id
    const attributes = req.body.attributes
    
    const updateAttributes = attributes.split(' ')    

    const person = await User.findById(personId)  
    
    var tempAttr = []

    updateAttributes.forEach( (attribute) => {
        tempAttr = [...tempAttr, attribute]
    })      

    User.updateOne({_id : person.id}, {attributes : tempAttr})
        .then( () => console.log(' Attributes added '))
        .catch( (err) => console.error(' Error adding attributes ', err))
    
    try {
        const { publicKey, privateKey } = await crypto.generateKeyPairSync('rsa', {
            modulusLength : 4096,
            publicKeyEncoding : {
                type : 'spki',
                format : 'pem'
            },
            privateKeyEncoding : {
                type : 'pkcs8',
                format : 'pem'
            }
        })
       
        // const updatedPublicKey = publicKey.replace(/-----BEGIN PUBLIC KEY-----\n/,'').replace(/-----END PUBLIC KEY-----\n/,'')
        // const updatedPrivateKey = privateKey.replace(/-----BEGIN PRIVATE KEY-----\n/,'').replace(/-----END PRIVATE KEY-----\n/,'')
        
        // console.log(' Public key : \n',updatedPublicKey)
        // console.log(' Private key : \n',updatedPrivateKey)
        
        assignKey = await User.findByIdAndUpdate(person.id, {
            publicKey,
            privateKey
        })

        if(assignKey) {
            res.status(200)
        }
        else {
            res.status(401)
            throw new Error(' Could not add keys ')
        }
              
        } catch (error) {
            res.status(400)
            throw new Error(' Could not add keys ')
        }

    res.json({message : 'Attributes successfully added '})
})

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn : '24h'
    })
}

// @desc    Access Policy
// @route   POST /api/users/policy
// @access  Private
const generateAccessPolicy = asyncHandler( async (req, res) => {
    const {secret, attributes} = req.body

    // accessCondition = attributes.split(' ')    
    // const accessPolicy = "(CEO == true) || (CFO == true)"
    const accessCondition = attributes.split(' ')   
    
    console.log(secret)
    console.log(accessCondition)

    const authorizedUsers = await User.find({attributes : {$in : accessCondition}}).select(['_id','name','publicKey'])    
    // const secret = 'https://www.google.com/'
    
    const encryptedData = authorizedUsers.map( (user) => {
        const publicKey = user.publicKey
        const buffer = Buffer.from(secret)
        const encrypted = crypto.publicEncrypt(publicKey, buffer)
        
        return { [user.name] : encrypted.toString('base64')}
    }) 

    //console.log(encryptedData)

    const allUsers = await User.find()    

    for(let i = 0; i < allUsers.length; i++) {

        const findUser = encryptedData.find( u => allUsers[i].name in u)
        if(findUser) {
            const user = await User.findOne({name : allUsers[i].name})
            
            const updateUser = await User.findByIdAndUpdate(user.id, {
                secretKey : findUser[user.name]
            })

            if(!updateUser) {
                throw new Error(' Could not update user ')
            }
        }
        else {
            const key = crypto.randomBytes(512).toString('base64')
            
            const updateUser = await User.findByIdAndUpdate(allUsers[i]._id,{
                secretKey : key
            })
        }
    }

    res.json({message : 'Access Policy generated'})

    // const test = crypto.randomBytes(512).toString('base64')
    // console.log(test)



    // const testUser = await User.findOne({attributes : 'CFO'})
    // const pvtKey = testUser.privateKey

    // const test = encryptedData.find( u => testUser.name in u)
    // console.log(test[testUser.name])    

    // const encrypted = Buffer.from(test[testUser.name], 'base64')
    // const decrypted = crypto.privateDecrypt(pvtKey, encrypted)

    // console.log(decrypted.toString())
    
    // jexl.eval(accessPolicy, tempUser).then( (result) => {
    //     if(result === true) {
    //         console.log('user satisfies access policy')
    //     }
    //     else {
    //         console.log(' not accepting access condition ')
    //     }
    // })   

})

// @desc    Decrypt Data
// @route   GET /api/users/decrypt
// @access  Private
const decryptUserData = asyncHandler( async (req, res) => {

    const currentUser = await User.findById(req.user.id)
    // console.log(currentUser)
    // console.log(encryptedData)

    // const testUser = await User.findOne({attributes : 'CFO'})
    // const pvtKey = testUser.privateKey

    // const test = encryptedData.find( u => testUser.name in u)
    // console.log(test[testUser.name])

    // const encrypted = Buffer.from(test[testUser.name], 'base64')
    // const decrypted = crypto.privateDecrypt(pvtKey, encrypted)

    // console.log(decrypted.toString())    

    const encrypted = Buffer.from(currentUser.secretKey, 'base64')
    const decrypted = crypto.privateDecrypt(currentUser.privateKey, encrypted)

    //console.log(decrypted.toString())

    const decData = decrypted.toString()
    
    res.status(200).json({
        decData
    })
})


module.exports = {
    registerUser,
    loginUser,
    getMe,
    addAttributes,   
    generateAccessPolicy,
    decryptUserData
}