const express = require('express');
const router = express.Router();
const register = require('../models/user/register')
var passwordHash = require('password-hash');
var validator = require("email-validator");
const bcrypt = require('bcrypt');

router.post('/login', async(req,res)=>{
   try {
            var email = req.body.email;
            var password = req.body.password;
            const user =await register.findOne({email:email})
            if(!user){
                return res.json({
                    massage: "please validate email "
                })
            }
            const valid_pass = await bcrypt.compare(password,user.Password)
           if(valid_pass==true){
               res.json({
                   message:"welcome "+user.username
               })
           }
           if(valid_pass==false){
            return res.json({
                m:"no match"
            })
        }
        } 

    catch (error) {res.status(500).send(error) }
 })


 router.get('/demo',async(req,res)=>{
     try {
         const user = await register.find().sort({_id:-1}).limit(1)
         console.log(user[0].email);
         res.send(user)
     } catch (error) {
        res.send(error) 
     }
 })
module.exports = router