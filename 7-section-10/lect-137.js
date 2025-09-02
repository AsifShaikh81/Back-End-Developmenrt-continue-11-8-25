// 137. Password Reset Functionality: Setting New Password

// -----------------lect 137--------
exports.resetPassword = tryCatchAsync(async (req, res, next) => {
// 1) Get user based on the token
const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

const user = await userM.findOne({
passwordResetToken: hashedToken,
passwordResetExpires: {$gt: Date.now()}})


// 2) If token has not expired, and there is user, set the new password
if (!user){
return next(new AppError('Token is invalid or has expired', 400))
}
user.password = req.body.password;
user.passwordConfirm = req.body.passwordConfirm;
user.passwordResetToken = undefined;
user.passwordResetExpires = undefined;
await user.save();

//3) Update changed PasswordAt property for the user
// 4) Log the user in, send JWT
const token = signToken(user._id);
res.status(200).json({
status:'success',
token
})

})

// in model
userSchema.pre('save', function (next) {
if (!this.isModified('password') || this.isNew) return next();
this.passwordChangedAt = Date.now()- 1000;
next();
});