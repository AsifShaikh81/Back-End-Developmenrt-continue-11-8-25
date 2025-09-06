const userM = require('../models/userModel');
const AppError = require('../utils/appError');
const tryCatchAsync = require('./../utils/try-catch-error-handler');
const factory = require('./handelFactory')


// *lect 139
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};
// *lect 139

// lect 164:Adding a /me Endpoint
exports.getMe =  async(req,res,next) =>{
req.params.ID = req.user.id
next()
}
// lect 164:Adding a /me Endpoint

// using factory function to get all 
exports.getAllUsers =  factory.getAll(userM)
/* exports.getAllUsers = tryCatchAsync(async (req, res, next) => {
  const data1 = await userM.find(req.body);

  res.status(200).json({
    status: 'success',
    data: data1,
  });
}); */

// *lect 139
exports.updateMe = tryCatchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('this route is not for user', 400));
  }

  // *2) update user document
  const filterBody = filterObj(req.body, 'name', 'email');
  const updateUser = await userM.findByIdAndUpdate(req.user.id, filterBody, { new: true, runValidators: true });
  res.status(200).json({
    status: 'success',
    data: {
      user: updateUser,
    },
  });
});
// *lect 139
// *lect 140
exports.deleteMe = tryCatchAsync(async (req, res) => {
  await userM.findByIdAndUpdate(req.user.id, { active: false });

  res.status(200).json({
    status: 'succes',
    data: null,
  });
});

// factory function for get user
exports.getUsers = factory.getOne(userM)
// *lect 140
/* exports.getUsers = (req, res) => {
  res.status(500).json({
    status: 'internal server issue',
    message: 'route not defined yet',
  });
}; */
exports.postUsers = (req, res) => {
  res.status(500).json({
    status: 'internal server issue',
    message: 'this route is not defined! please use /signup instead',
  });
};
exports.patchUsers  = factory.updateOne(userM)
/* exports.patchUsers = (req, res) => {
  res.status(500).json({
    status: 'internal server issue',
    message: 'route not defined yet',
  });
}; */
// using handel factory for delete 
 exports.deleteUsers = factory.deleteOne(userM)
/* exports.deleteUsers = (req, res) => {
  res.status(500).json({
    status: 'internal server issue',
    message: 'route not defined yet',
  });
}; */

// also implemente for user check user contoller