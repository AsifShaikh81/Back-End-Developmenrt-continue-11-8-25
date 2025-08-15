const express = require('express');
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'internal server issue',
    message: 'route not defined yet',
  });
};
const getUsers = (req, res) => {
  res.status(500).json({
    status: 'internal server issue',
    message: 'route not defined yet',
  });
};
const postUsers = (req, res) => {
  res.status(500).json({
    status: 'internal server issue',
    message: 'route not defined yet',
  });
};
const patchUsers = (req, res) => {
  res.status(500).json({
    status: 'internal server issue',
    message: 'route not defined yet',
  });
};
const deleteUsers = (req, res) => {
  res.status(500).json({
    status: 'internal server issue',
    message: 'route not defined yet',
  });
};

const router = express.Router();

router.route('/').get(getAllUsers).post(postUsers);
router.route('/:id').get(getUsers).patch(patchUsers).delete(deleteUsers);

module.exports = router;
