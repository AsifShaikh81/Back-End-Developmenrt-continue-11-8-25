const userM = require("../models/userModel");
const tryCatchAsync = require('./../utils/try-catch-error-handler');

exports.getAllUsers = tryCatchAsync(async(req, res,next) => {

  const data1 = await userM.find(req.body)

  res.status(200).json({
    status: 'success',
    data: data1
  });
});
exports.getUsers = (req, res) => {
  res.status(500).json({
    status: 'internal server issue',
    message: 'route not defined yet',
  });
};
exports.postUsers = (req, res) => {
  res.status(500).json({
    status: 'internal server issue',
    message: 'route not defined yet',
  });
};
exports.patchUsers = (req, res) => {
  res.status(500).json({
    status: 'internal server issue',
    message: 'route not defined yet',
  });
};
exports.deleteUsers = (req, res) => {
  res.status(500).json({
    status: 'internal server issue',
    message: 'route not defined yet',
  });
};