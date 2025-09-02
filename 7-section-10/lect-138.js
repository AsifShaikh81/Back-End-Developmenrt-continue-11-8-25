
//* ------lect 138:. Updating the Current User: Password

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.updatePassword = tryCatchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await userM.findById(req.user.id).select('+password');
  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }
  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  
  // User.findByIdAndUpdate will NOT work as intended!
  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
});
