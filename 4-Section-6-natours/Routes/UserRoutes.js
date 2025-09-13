// global route for users : '/api/v1/users'
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
  getMe,
} = require('../Controllers/userControllers'); // importing controllers, another way of imporitng controllers called 'destructuring import'
const authController = require('./../Controllers/authController');

const router = express.Router();

//*----------auth--------------------
router.route('/signup').post(authController.signUp); //auth
router.route('/login').post(authController.logIn); //auth
router.route('/logout').get(authController.logout); //auth

router.route('/forgotPassword').post(authController.forgotPassword);
router.route('/resetPassword/:token').patch(authController.resetPassword);
// u need to logged in to update password
router.route('/updatePassword').patch(authController.protectTourRoute, authController.updatePassword);
//*----------auth--------------------

// middelware run sequencly , so we using protect function globally => router. use (authCont roller. protect) ; iske baad jo bhi route ayga sab protect hojayga
router.use(authController.protectTourRoute); // lect 165

// u need to logged in to get ur own info
router.route('/me').get(getMe, getUsers); // lect 164
// u need to logged in to update ur name and email
router.route('/updateme').patch(updateMe);
// u need to logged in to delete  ur aacount
router.route('/deleteMe').delete(deleteMe);

//now only adming can get all user ,get user by id,create user,patch,delete user
router.use(authController.restrictTo('admin', 'user')); //lect 165
router.route('/').get(getAllUsers).post(postUsers);
router.route('/:ID').get(getUsers).patch(patchUsers).delete(deleteUsers);

module.exports = router;
