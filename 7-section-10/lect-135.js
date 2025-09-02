const crypto = require('crypto'); // no need to install inside user model
//*lect 135: Password Reset Functionality: Reset Token
// forgot passwprd

// inside user route 
router.route('/forgotPassword').post(authController.forgotPaaword)

// insdie auth controller
exports.forgotPaaword = tryCatchAsync(async (req, res, next) => {
  //*1) get user based on posted email
  const user = await userM.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('there is no user with the email address'));
  }
  // 2) generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
});
// inside user model folder
/*   passwordResetExpires:String,
  passwordResetExpires:Date */

// lect 135
//   *instance
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  console.log({ resetToken }, this.passwordResetToken);
  return resetToken;
};
