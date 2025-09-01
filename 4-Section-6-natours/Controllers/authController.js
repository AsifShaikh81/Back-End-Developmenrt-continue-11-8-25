//*lect 126: creating user/sign up

const {promisify} = require('util')
const userM = require('../models/userModel');
const tryCatchAsync = require('./../utils/try-catch-error-handler');
const jwt = require('jsonwebtoken');

const AppError = require('./../utils/appError');

// lect 130
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
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
     role: req.body.role
  });
  // creating token
  // ---------------------payload---------------//secretKey---------------//option expiresin -> kab jwt token expire hoga
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
  // sending response
  res.status(201).json({
    status: 'success',
    token, // sending token
    data: newUser,
  });
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
  res.status(201).json({
    status: 'success',
    token,
  });
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
   const decode = await promisify(jwt.verify)(tokenn, process.env.JWT_SECRET)
    console.log(decode);

  //*3) check if user stil exist
   const currentUser =await userM.findById(decode.id) //*here .id is a payload
   if(!currentUser){
    return next(new AppError('user belong to this token no longer exist',401))
   }
    
  //*4) Check if user changed password after the token was issued
   if(currentUser.changePasswordAfter(decode.iat)){
    return next(new AppError('user recently changed ',401))
   }
   //*GRANT ACCESS TO PROTECTED ROUTE
   req.user = currentUser
  next()
});

//*134
exports.restrictTo = (...roles)=>{
  return (req,res,next) =>{
    if(!roles.includes(req.user.role)){
      return next(new AppError('u dont have permisiion',403))
    }
    next()
  }
}

//*lect 135: Password Reset Functionality: Reset Token
// forgot passwprd
exports.forgotPassword = tryCatchAsync(async(req,res,next)=>{
  //*1) get user based on posted email
  const user = await userM.findOne({email:req.body.email})
  if(!user){
    return next(new AppError('there is no user with the email address'))
  }
  // 2) generate the random reset token 
const resetToken = user.createPasswordResetToken();
await user.save({ validateBeforeSave:false})
}
)