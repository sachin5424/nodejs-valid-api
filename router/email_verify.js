const express = require('express');
const router = express.Router();
const register = require('../models/user/register')
var passwordHash = require('password-hash');
var validator = require("email-validator");
const bcrypt = require('bcrypt');
const user_email_verfiy_save = require('../models/user/email_verifier')

router.post('/verification',async(req,res)=>{
    try {
        console.log(req.body);
        var email = req.body.email;
        var opt =  req.body.opt
        if (!validator.validate(`${email}`)) {
            return res.status(400).json({
                massage: "please validate your email address "
            })
        }
        const verfiy_email =await register.findOne({email:email})
        if(!verfiy_email){
            return res.json({
                massage: "please validate email "
            })
        }
        const verfiy = await user_email_verfiy_save.findOne({email:email})
        if(opt==verfiy.email_verification_otp){
       
            const user = await register.findOne({email:email})
            const user_isActive = await register.findByIdAndUpdate(user._id,{isActive:true},{new:true})
          
            res.status(200).json({
                massage: " welocome "
            })
        }
        else{
            res.status(400).json({
                massage: "please validate Otp "
            })
        }
    } catch (error) {
        res.status(500).send(error)
    }
});


module.exports = router


