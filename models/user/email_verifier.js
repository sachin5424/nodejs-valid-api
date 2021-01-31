const mongoose = require('mongoose')

const Email_verification = mongoose.Schema({
    email:{
        type:String,
        index:{
            unique: true,
        },
        required:true,
    },
    email_verification_otp:{
        type:String,
        unique:true,
        required:true,
        min:4,
        max:4,
    },
    date:{
        type:Date,
        default:Date.now
     }

})
module.exports = mongoose.model('Email_verifications',Email_verification)