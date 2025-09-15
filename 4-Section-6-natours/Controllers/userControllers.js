const userM = require('../models/userModel');
const AppError = require('../utils/appError');
const tryCatchAsync = require('./../utils/try-catch-error-handler');
const factory = require('./handelFactory');
const multer = require('multer');
const sharp = require('sharp');

// multer lec 200
// creating storage
/* const multerStorage = multer.diskStorage({
  // des de rahe ki img file kaha hai
  destination: (req, file, cb) => {
    cb(null, 'starter/public/img/users');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `userM-${req.user.id}-${Date.now()}.${ext}`);
  },
}); */
// saving in memory // lect 202
const multerStorage = multer.memoryStorage();
// creating filter, agar upload kiya hua file img hai ya nahi hai toh kya kare
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadPhotos = upload.single('photo'); // lect 200

exports.resizeUserPhoto =tryCatchAsync( async(req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `userM-${req.user.id}-${Date.now()}.jpeg`;
  //-------------------------------ht--widt
   await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`starter/public/img/users/${req.file.filename}`);

 next();
});

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
exports.getMe = async (req, res, next) => {
  req.params.ID = req.user.id;
  next();
};
// lect 164:Adding a /me Endpoint

// using factory function to get all
exports.getAllUsers = factory.getAll(userM);
/* exports.getAllUsers = tryCatchAsync(async (req, res, next) => {
  const data1 = await userM.find(req.body);

  res.status(200).json({
    status: 'success',
    data: data1,
  });
}); */

// *lect 139
exports.updateMe = tryCatchAsync(async (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('this route is not for user', 400));
  }

  // *2) update user document
  const filterBody = filterObj(req.body, 'name', 'email');
  if (req.file) filterBody.photo = req.file.filename; //lec 201
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
exports.getUsers = factory.getOne(userM);
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
exports.patchUsers = factory.updateOne(userM);
/* exports.patchUsers = (req, res) => {
  res.status(500).json({
    status: 'internal server issue',
    message: 'route not defined yet',
  });
}; */
// using handel factory for delete
exports.deleteUsers = factory.deleteOne(userM);
/* exports.deleteUsers = (req, res) => {
  res.status(500).json({
    status: 'internal server issue',
    message: 'route not defined yet',
  });
}; */

// also implemente for user check user contoller
