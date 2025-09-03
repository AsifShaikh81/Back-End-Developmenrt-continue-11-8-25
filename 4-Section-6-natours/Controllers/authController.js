//*lect 126: creating user/sign up

const { promisify } = require('util');
const userM = require('../models/userModel');
const tryCatchAsync = require('./../utils/try-catch-error-handler');
const jwt = require('jsonwebtoken');

const AppError = require('./../utils/appError');
const sendEmail = require('./../utils/email');
const crypto = require('crypto');

// lect 130
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
//lect 138
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  //* lect 142
  const cookieOptions = {
    // -------------------------------------------------------------  converting to miliseconds
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),

    httpOnly: true,
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true; // enable only in production mode
  res.cookie('jwt', token, cookieOptions);
  user.password = undefined;
  // newUser.password = undefined;
  //* lect 142

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};
//lect 138
// lect 130
//*sign up
exports.signUp = tryCatchAsync(async (req, res, next) => {
  // const user =  await userM.create(req.body) //*replaced with below code, this not correct check lect 126
  //   lect  129: sign up
  const newUser = await userM.create({
    // client se name,email,password,passwordConfirm, le rah hai
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });
  // creating token
  // ---------------------payload---------------//secretKey---------------//option expiresin -> kab jwt token expire hoga
  //_id= coming from database
  // jwt.sign =  this will create token
  // *const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  // sending response
  createSendToken(newUser, 201, res)
/*   res.status(201).json({
    status: 'success',
    token, // sending token
    data: newUser,
  }); */
});
//   lect  129
//*login
exports.logIn = tryCatchAsync(async (req, res, next) => {
  // client se email and password le rah hai
  const { email, password } = req.body;

  //1) check if email and password exist if not return error
  if (!email && !password) {
    return new AppError('email and password not exist');
  }
  // Step 2: Find user by email + include password
  const user = await userM.findOne({ email }).select('+password');
  /*  .select('+password') isliye likha hai kyunki schema me password field ko by default "select: false" karte hain (taaki normal queries me password kabhi na aaye).

Lekin login ke waqt password chahiye to verify, isliye explicitly include kar rahe hain. */

  //3)
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('inc pass or email', 401));
  }
  //3) if everything ok send to client
  const token = signToken(user._id); // creating token , this function created above
  createSendToken(user, 200, res)
 /*  res.status(201).json({
    status: 'success',
    token,
  }); */
});

//* lect 131. Protecting Tour Routes - Part 1
// creating middlware to protect tour route
//*1) Getting token and check of it Is there
exports.protectTourRoute = tryCatchAsync(async (req, res, next) => {
  let tokenn;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    tokenn = req.headers.authorization.split(' ')[1];
  }
  // console.log(tokenn);
  if (!tokenn) {
    return next(new AppError('You are not logged in', 401));
  }
  //*2) verification of token
  // jwt.verify = for verifying token that coming from user,
  // Remember note: create test signature compare it with orignal signature
  const decode = await promisify(jwt.verify)(tokenn, process.env.JWT_SECRET);
  console.log(decode);

  //*optional-----
  //*3) check if user stil exist
  const currentUser = await userM.findById(decode.id); //*here .id is a payload
  if (!currentUser) {
    return next(new AppError('user belong to this token no longer exist', 401));
  }

  //*4) Check if user changed password after the token was issued
  if (currentUser.changePasswordAfter(decode.iat)) {
    return next(new AppError('user recently changed ', 401));
  }
  //*optional-----
  //*GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

//*134
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError('u dont have permisiion', 403));
    }
    next();
  };
};

//*lect 135: Password Reset Functionality: Reset Token
// forgot passwprd
exports.forgotPassword = tryCatchAsync(async (req, res, next) => {
  //*1) get user based on posted email
  const user = await userM.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('there is no user with the email address'));
  }
  // 2) generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  //*lect 136
  // 3) send it to user's email
  const reseturl = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;

  const message = `forgot ur pass? submit patch req and pass confirm to: ${reseturl}`;

  try {
    await sendEmail({ email: user.email, subject: 'your pass reset token(valid for 10)', message });

    res.status(200).json({
      status: 'success',
      message: 'token sent to email',
    });
  } catch (error) {
    ((user.passwordResetToken = undefined),
      (user.passwordResetExpires = undefined),
      await user.save({ validateBeforeSave: false }));
    return next(new AppError('error sending email', 500));
  }
});

// -----------------lect 137. Password Reset Functionality: Setting New Password--------
exports.resetPassword = tryCatchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

  const user = await userM.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save(); // saved after modifying

  //3) Update changed PasswordAt property for the user
  // 4) Log the user in, send JWT
  const token = signToken(user._id);
  createSendToken(user, 200, res)
/*   res.status(200).json({
    status: 'success',
    token,
  }); */
});

// ------------lect 138
exports.updatePassword = tryCatchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await userM.findById(req.user.id).select('+password');
  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }
  // 3) If so, update password
  // pass from db = pass that user entering
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save(); // saving updated pass in database

  // User.findByIdAndUpdate will NOT work as intended!
  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
