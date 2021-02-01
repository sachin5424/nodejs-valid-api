const express = require('express');
const router = express.Router();
const register = require('../models/user/register')
var passwordHash = require('password-hash');
var validator = require("email-validator");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var auth = require('../middleware/jwt/user/userlogin')
router.post('/login', async(req,res)=>{
   try {   
           console.log(req.body);
            var email = req.body.email;
            var password = req.body.password;
            const user =await register.findOne({email:email})
            if(!user){
                return res.status(400).json({
                    massage: "please validate email "
                })
            }
            const valid_pass = await bcrypt.compare(password,user.Password)
           if(valid_pass==true){
           var token=await jwt.sign({
                       userID:user._id,
                       username:user.username

                  }, 'sagar',)
               res.status(200).json({
                   token:token

               })
           }
           if(valid_pass==false){
            return res.status(400).json({
                massage: "please validate password "
            })
        }
        } 

    catch (error) {res.status(500).send(error) }
 })


 router.get('/demo',auth,async(req,res)=>{
     try {
         console.log(req.userDe);
         const user = await register.find()
         console.log(user[0].email);
         res.send(user)
     } catch (error) {
        res.send(error) 
     }
 })
module.exports = router