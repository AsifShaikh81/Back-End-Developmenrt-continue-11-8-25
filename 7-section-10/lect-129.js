const jwt = require('jsonwebtoken');

exports.signUp = tryCatchAsync(async (req, res, next) => {
  // const user =  await userM.create(req.body) //*replaced with below code this not correct 129
  const newUser = await userM.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRES_IN });

  res.status(201).json({
    status: 'success',
    token,
    data: newUser,
  });
});