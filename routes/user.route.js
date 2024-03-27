const {userModel} = require('../models/user.model')
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userRouter = express.Router()

userRouter.post('/register', async(req, res)=> {
    const {password} = req.body
    try {
        bcrypt.hash(password, 5, async(err, hash)=> {
            if(hash){
                const user = new userModel({
                    ...req.body,
                    password: hash
                })
            await user.save()
            res.status(201).send({"message": "user has been registered sucessfully!"})
            }
        })
    } catch (error) {
        res.status(400).send({"message": error})
    }
})

userRouter.post('/login', async(req, res)=> {
    const {email, password} = req.body
    try {
        const user = await userModel.findOne({email})
        if(user){
            bcrypt.compare(password, user.password, (err, result)=> {
                if(result){
                    const token = jwt.sign({id: user._id}, 'authentication')
                    res.status(200).send({"message": "user logged in sucessfully", "token": token})
                }
                else{
                    res.status(200).send({"message": "invalid credentials"})
                }
            })
        }
    } catch (error) {
        res.status(400).send({"message": error})
    }
})

module.exports = {
    userRouter
}