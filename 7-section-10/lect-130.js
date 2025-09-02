// 130. Logging in Users
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
};

// -----------------
exports.logIn = tryCatchAsync(async (req, res, next) => {
  // client se email and password le rah hai
  const { email, password } = req.body;

  //1) check if email and password exist if not return error
  if (!email && !password) {
    return new AppError('email and password not exist');
  }
  // Step 2: Find user by email + include password
  const user = await userM.findOne({ email }).select('+password');
  /* //* .select('+password') isliye likha hai kyunki schema me password field ko by default "select: false" karte hain (taaki normal queries me password kabhi na aaye).

//*Lekin login ke waqt password chahiye to verify, isliye explicitly include kar rahe hain. */

  // *------------------------------------ -clientpass / db password
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('inc pass or email', 401));
  }
  //3) if everything ok send to client
  const token = signToken(user._id); // function created above
  res.status(201).json({
    status: 'success',
    token,
  });
});

// -------------insode modudle-------------------

userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
// candite password -->  password coming from user
// userPassword --> coming from database, it is hashed
// *explaination : https://chatgpt.com/c/68b2c2dc-fc4c-8326-bb57-47a48f6a7135

/* Key Points in Flow
check above chat gpt link for flow and proer explaination

req.body → User credentials aati hain.

Validation → Agar fields missing → error.

Mongoose .findOne({ email }).select('+password') → User dhoondta hai aur hidden password ko temporarily include karta hai.

bcrypt.compare() → Entered vs Stored hashed password compare.

JWT → Token banata hai jo user ko future requests me authenticate karega. */
