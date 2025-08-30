/* Section I0: Authentication, Authorization
and Security */

const validator = require('validator')

const mongoose = require('mongoose')
const { trim, isLowercase } = require('validator')
const { default: isEmail } = require('validator/lib/isEmail')

const userSchema =  new mongoose.Schema({
    name:{
        type:String,
        required:[true,'name is required'],
        trim: true

    },
    email:{
        type:String,
        required:[true,'email is required'],
        trim: true,
        unique:true,
        lowercase:true,
        validate:[validator.isEmail, 'provide valid email' ] //*isEmail => check is email entred by user is valid or not like this: xxx@gmail.com

    },
    photo:{
        type:String,
        required:[true,'photo is required'],
        

    },
    password:{
        type:String,
        unique:true,
        required:[true,'password is required'],
        minlength: 8
        // trim: true


    },
    passwordConfirm:{
        type:String,
        unique:true,
        required:[true,'passwordConfirm is required'],
        minlength: 8
        // trim: true

    },
})

const userModel = mongoose.model('userModel', userSchema)

module.exports = userModel;

//imp in sec 4