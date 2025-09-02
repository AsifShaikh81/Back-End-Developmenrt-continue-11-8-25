const express = require('express');
// const UserControllers = require('../Controllers/userControllers') // importing controllers
const {
  getAllUsers,
  postUsers,
  getUsers,
  patchUsers,
  deleteUsers,
  updateMe,
  deleteMe,
} = require('../Controllers/userControllers'); // importing controllers, another way of imporitng controllers called 'destructuring import'
const authController = require('./../Controllers/authController');

const router = express.Router();
//*----------auth--------------------
router.route('/signup').post(authController.signUp); //auth
router.route('/login').post(authController.logIn); //auth

router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);
router.route('/updatePassword').patch(authController.protectTourRoute, authController.updatePassword);
//*----------auth--------------------
router.route('/updateme').patch(authController.protectTourRoute, updateMe);
router.route('/deleteMe').delete(authController.protectTourRoute, deleteMe);

router.route('/').get(getAllUsers).post(postUsers);
router.route('/:id').get(getUsers).patch(patchUsers).delete(deleteUsers);

module.exports = router;
