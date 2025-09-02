//127. Managing Passwords
//*we learn to check duplicate password and hash password
/*  passwordConfirm: {
    type: String,
    unique: true,
    required: [true, 'passwordConfirm is required'],
    minlength: 8,
     trim: true
   //*  -----main focus-----------
     validate: {
        validator: function (el) {
            return el === this.password;
            },
            },
            message: 'password must be same',
            },
            }); */

userSchema.pre('save', async function (next) {
  // ➡️ Agar password field modify hi nahi hua hai (jaise user sirf email update kar raha hai), toh hashing dobara run karne ki zarurat nahi hai. Isliye next() call karke middleware ko skip kar dete ho.
  //  Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // password ko hast kar rahe hai
  this.password = await bcrypt.hash(this.password, 12);

  // agar password hash hogaya toh passwordConfirm ko undefined kardo yani tabhi validation mat lagao
  this.passwordConfirm = undefined;
});
//* -----main focus-----------
