/* Section I0: Authentication, Authorization
and Security */

const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

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
  role: {
    type: String,
    enum: ['admin', 'user', 'guid', 'lead-guide'],
    default: 'user',
  },
  password: {
    type: String,
    // unique: true,
    select: false,
    required: [true, 'password is required'],
    minlength: 8,
    // trim: true
  },
  passwordConfirm: {
    type: String,

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
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

//* hashing password
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
//------------lect 137-------
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
//------------lect 137-------

// -------------lect 140--------------

userSchema.pre(/^find/, function (next) {
  //this points to current querty
  this.find({ active: { $ne: false } });
  // this.find({ active: true });
  next();
});

// -------------lect 140--------------

// ---------lect 130---------
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
// --------------- lect 132----------------
userSchema.methods.changePasswordAfter = function (JWTtimestamp) {
  if (this.passwordChangedAt) {
    const changeTimestamp = parseInt(this.passwordChangedAt.getTime() / 1000, 10);
    return JWTtimestamp < changeTimestamp;
  }
  return false; //* false means not changed
};

// lect 135
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  console.log({ resetToken }, this.passwordResetToken);
  return resetToken;
};
const userM = mongoose.model('userModel', userSchema);

// ---------lect 130---------
module.exports = userM;
