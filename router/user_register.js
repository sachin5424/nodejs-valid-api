const express = require('express');
const router = express.Router();
const register = require('../models/user/register')
var passwordHash = require('password-hash');
var validator = require("email-validator");



router.get('/',async(req,res)=>{
    console.log('ok');
})

router.post('/register',async(req,res)=>{
    try {
         var username = req.body.username;
         var email = req.body.email;
         var password = req.body.password;
         var confpassword = req.body.confpassword;    
         if (username.length < 3){
             return res.status(400).json(
                {
                    massage:"username length minimum 3 characters"
                })} 
         if(!validator.validate(`${email}`)){
            return res.status(400).json({
                massage:"please validate your email address "
            })
        }
        const check_valid_user = await register.find({})
        if (check_valid_user) {
            for(var key in check_valid_user){
                console.log(check_valid_user[key].username);
                if (username==check_valid_user[key].username) {
                    return res.status(401).json({
                        massage:"username is already registered"
                    })
                }
                if (email==check_valid_user[key].email) {
                    return res.status(401).json({
                        massage:"Email is already registered "
                    })
                }      
            }
        } 
        if (password == confpassword) {
            var hashedPassword = passwordHash.generate(password);
            const user = await register ({
                username:username,
                email:email,
                Password:hashedPassword,
            })
            user.save()
            res.status(201).send(user)
        }
        else{
            return res.status(400).json({
                massage:"passsword and confirm password not match "
            })
        }     
    } catch (error) {
        res.status(501).send(error)
    }
})

module.exports = router