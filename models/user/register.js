const mongoose = require('mongoose');
const Register = mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true,
        min:4,
        max:15,
    },
    email: {
        type: String,
        unique: true,
        required: true
 
    },
    Password:{
        type:String,
        required:true,
        min:4,
        max:50,
    },
    isActive:{
       type:Boolean,
       default:false,
    },
    date:{
       type:Date,
       default:Date.now
    }
})
module.exports = mongoose.model('jwt',Register)