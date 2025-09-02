router.route('/deleteMe').delete(authController.protectTourRoute, deleteMe);
exports.deleteMe = tryCatchAsync(async (req, res) => {
  await userM.findByIdAndUpdate(req.user.id, { active: false });

  res.status(200).json({
    status: 'succes',
    data: null,
  });
});

userSchema.pre(/^find/, function (next) {
  //this points to current querty
  this.find({ active: { $ne: false } });
  // this.find({ active: true });
  next();
});
