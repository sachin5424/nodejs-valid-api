const express = require('express');
const router = express.Router();
const register = require('../models/user/register')
// var passwordHash = require('password-hash');
var validator = require("email-validator");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const user_email_verfiy_save = require('../models/user/email_verifier')
router.get('/', async (req, res) => {
    console.log('ok');
})

router.post('/register', async (req, res) => {
    try {
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;
        var confpassword = req.body.confpassword;
        if (username.length < 3) {
            return res.status(400).json(
                {
                    massage: "username length minimum 3 characters"
                })
        }
        if (!validator.validate(`${email}`)) {
            return res.status(400).json({
                massage: "please validate your email address "
            })
        }
        const check_valid_user = await register.find({})
        if (check_valid_user) {
            for (var key in check_valid_user) {
                if (username == check_valid_user[key].username) {
                    return res.status(401).json({
                        massage: "username is already registered"
                    })
                }
                if (email == check_valid_user[key].email) {
                    return res.status(401).json({
                        massage: "Email is already registered "
                    })
                }
            }
        }
        if (password == confpassword) {
            bcrypt.hash(password, 10, function (err, hash) {
                if (err) {
                    return res.json({
                        message: "somthing wrong try later"
                    })
                }
                else {
                    const user = new register({
                        username: username,
                        email: email,
                        Password: hash,
                    })
                    user.save()
                    res.status(201).send(user)
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: 'easyeasytolearn70@gmail.com',
                          pass: 'Viraj@5424'
                        }
                      });
                      
                      var mailOptions = {
                        from: 'easyeasytolearn70@gmail.com',
                        to: `${user.email}`,
                        subject: 'Sending Email using Node.js testing',
                        text: 'That was easy!'
                      };
                      
                      transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                          console.log(error);
                        } else {
                          console.log('Email sent: ' + info.response);
                        }
                      });
                    var random_opt =  Math.floor(1000 + Math.random() * 9000)
                    const Verfiy_email = new user_email_verfiy_save({
                        email:user.email,
                        email_verification_otp:random_opt
                    })
                    Verfiy_email.save()                  
                }
            });
        }
        else {
            return res.status(400).json({
                massage: "passsword and confirm password not match "
            })
        }
    } catch (error) {
        res.status(501).send(error)
    }
})

module.exports = router