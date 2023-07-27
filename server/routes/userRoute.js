const router = require("express").Router()
const jwt = require("jsonwebtoken")
const User = require('../models/userModel')

const createToken = (_id)=>{
    return jwt.sign({_id}, process.env.SECRET)
}

//  LOGIN router
router.post('/login', async(req, res)=>{
    try {
        const {email, password} = req.body
        const user = await User.login(email, password)

        const token = createToken(user._id)
        res.status(200).send({token, email})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

//  SIGNUP router
router.post('/signup', async(req, res)=>{
    try {
        const {email, password} = req.body
        const user = await User.signup(email, password)
        const token = createToken(user._id)

        res.status(201).send({token, email})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

module.exports = router