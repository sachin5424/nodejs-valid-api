const mongoose = require('mongoose');


var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

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
    }
})
module.exports = mongoose.model('jwt',Register)