const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jexl = require('jexl')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const UKey = require('../models/userKeyModel')

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
        const { publicKey, privateKey } = await crypto.generateKeyPairSync('ec', {
            namedCurve : 'secp256k1',
            publicKeyEncoding : {
                type : 'spki',
                format : 'pem'
            },
            privateKeyEncoding : {
                type : 'pkcs8',
                format : 'pem'
            }
        })
       
        const updatedPublicKey = publicKey.replace(/-----BEGIN PUBLIC KEY-----\n/,'').replace(/-----END PUBLIC KEY-----\n/,'')
        const updatedPrivateKey = privateKey.replace(/-----BEGIN PRIVATE KEY-----\n/,'').replace(/-----END PRIVATE KEY-----\n/,'')
        
        console.log(' Public key : \n',updatedPublicKey)
        console.log('\n\n Private key : \n',updatedPrivateKey)  
        
        const userKeyExists = await UKey.findById(person.id)
        let assignKey

        if(userKeyExists) {
            assignKey = await UKey.findByIdAndUpdate(person.id,{
                publicKey : updatedPublicKey,
                privateKey : updatedPrivateKey
            })            
        }
        else {
            assignKey = await UKey.create({
                _id : person.id,
                publicKey : updatedPublicKey,
                privateKey : updatedPrivateKey
            })
        }        

        if(assignKey) {
            res.status(201)
        }
        else {
            res.status(401)
            throw new Error(' Could not update keys ')
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

    })
}

// @desc    Access Policy
// @route   POST /api/users/policy
// @access  Private
const generateAccessPolicy = asyncHandler( async (req, res) => {
    const accessPolicy = "(CEO == true) || (CFO == true)"
    const accessCondition = ['CEO','CFO']

    const tempUser = {}

    for(let i = 0; i < accessCondition.length; i++) {
        const attr = accessCondition[i]
        tempUser[attr] = true
    }
    
    jexl.eval(accessPolicy, tempUser).then( (result) => {
        if(result === true) {
            console.log('user satisfies access policy')
        }
        else {
            console.log(' not accepting access condition ')
        }
    })

    res.json({message : 'Access Policy generated'})

})


module.exports = {
    registerUser,
    loginUser,
    getMe,
    addAttributes,   
    generateAccessPolicy 
}