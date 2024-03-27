const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const auth = async (req, res, next)=> {
    const token = req.headers.authorization?.split(" ")[1]

    if(token){
        jwt.verify(token, 'authentication', (err, decoded)=> {
            if(decoded){
                req.body.id = decoded.id
                next()
            }
            else{
                res.status(200).send({"message": "you are not authorized !"})
            }
        })
    }
    else{
        res.status(400).send({"message": "please login"})
    }
}

module.exports = {
    auth
}