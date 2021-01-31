const express = require('express');
const router = express.Router();
const register = require('../models/user/register')
var passwordHash = require('password-hash');
var validator = require("email-validator");
const bcrypt = require('bcrypt');

router.post('/verification',async(req,res)=>{
    try {
        console.log(req.body);
    } catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router