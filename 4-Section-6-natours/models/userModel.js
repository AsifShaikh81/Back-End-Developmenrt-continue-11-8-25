/* Section I0: Authentication, Authorization
and Security */

const validator = require('validator');
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'provide valid email'], //*isEmail => check is email entred by user is valid or not like this: xxx@gmail.com
  },
  photo: {
    type: String,
    // required:[true,'photo is required'],
  },
  password: {
    type: String,
    unique: true,
    select: false,
    required: [true, 'password is required'],
    minlength: 8,
    // trim: true
  },
  passwordConfirm: {
    type: String,
    unique: true,
    // select: false,
    required: [true, 'passwordConfirm is required'],
    minlength: 8,
    // trim: true
    //----------lect 127-------------
    validate: {
        validator: function (el) {
            return el === this.password;
        },
    },
    message: 'password must be same',
},
});

userSchema.pre('save', async function (next) {
    // agar password modified nahi hua toh next return kardo
    //  Only run this function if password was actually modified
    if (!this.isModified('password')) return next();
    
    // password ko hast kar rahe hai
    this.password = await bcrypt.hash(this.password, 12);
    
    // agar password hash hogaya toh passwordConfirm ko undefined kardo yani tabhi validation mat lagao
    this.passwordConfirm = undefined;
});
//----------lect 127-------------
// ---------lect 130---------
userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const userM = mongoose.model('userModel', userSchema);

// ---------lect 130---------
module.exports = userM;
