// *lect 132 Protecting Tour Routes - Part 2

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
   const decode = promisify(jwt.verify)(tokenn, process.env.JWT_SECRET)
    console.log(decode);

    //* main code from part 2-------------
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

userSchema.methods.changePasswordAfter = function (JWTtimestamp) {
    if(this.passwordChangetAt){
        const changeTimestamp =  parseInt(
            this.passwordChangetAt.getTime()/1000,10
        )
        return JWTtimestamp < changeTimestamp
    }
    return false //* false means not changed
    
};
//* part 2-------------