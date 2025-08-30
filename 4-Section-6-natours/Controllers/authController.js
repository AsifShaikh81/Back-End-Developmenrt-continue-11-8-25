//*lect 126: creating user/sign up

const userM = require('../models/userModel');
const tryCatchAsync = require('./../utils/try-catch-error-handler');
const jwt = require('jsonwebtoken');

const AppError = require('./../utils/appError')

// lect 130
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
};
// lect 130

exports.signUp = tryCatchAsync(async (req, res, next) => {
  // const user =  await userM.create(req.body) //*replaced with below code this not correct check lect 126
//   lect  129: sign up
const newUser = await userM.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
});
// ---------------------payload---------------//secretKey---------------//option expiresin -> kab jwt token expire hoga
const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN});

res.status(201).json({
    status: 'success',
    token,
    data: newUser,
});
});
//   lect  129

exports.logIn = tryCatchAsync(async (req, res,next) => {
   // client se email and password le rah hai 
    const {email,password} = req.body;

    //1) check if email and password exist if not return error
    if(!email && !password){
        return new AppError('email and password not exist')
    }
  // Step 2: Find user by email + include password
 const user = await userM.findOne({email}).select('+password');
/*  .select('+password') isliye likha hai kyunki schema me password field ko by default "select: false" karte hain (taaki normal queries me password kabhi na aaye).

Lekin login ke waqt password chahiye to verify, isliye explicitly include kar rahe hain. */

//3)
 if(!user || !(await user.correctPassword(password, user.password))){
    return next(new AppError('inc pass or email',401))
 }
  //3) if everything ok send to client 
  const token = signToken(user._id) // creating token , this function created above
  res.status(201).json({
    status: 'success',
    token,
    
  });
});
