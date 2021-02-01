const express = require('express');
const router = express.Router();
const register = require('../models/user/register')
var passwordHash = require('password-hash');
var validator = require("email-validator");
const bcrypt = require('bcrypt');
const user_email_verfiy_save = require('../models/user/email_verifier')



router.post('/update',async(req,res)=>{
    try {
         email= req.body.email
         update = req.body.update
        const find_mail = await register.findOne({email:email,isActive:false})
        var _id =find_mail.email
        console.log(find_mail.email);
        if(find_mail){
            const doc = await user_email_verfiy_save.findOneAndUpdate({email:_id},{email:"demo@gmail.com"},{new:true});
            console.log(doc);
        }
        else{
            return res.status(404).json({
                message:"email not found",

            })
        }
      
     
    } catch (error) {
        

    }
})

module.exports = router