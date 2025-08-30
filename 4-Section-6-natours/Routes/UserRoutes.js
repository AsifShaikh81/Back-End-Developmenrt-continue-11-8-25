const express = require('express');
// const UserControllers = require('../Controllers/userControllers') // importing controllers
const {getAllUsers,postUsers,getUsers,patchUsers,deleteUsers} = require('../Controllers/userControllers') // importing controllers, another way of imporitng controllers called 'destructuring import'
const authController = require('./../Controllers/authController')

const router = express.Router();
router.route('/signup').post(authController.signUp) //auth
router.route('/login').post(authController.logIn) //auth

router.route('/').get(getAllUsers).post(postUsers);
router.route('/:id').get(getUsers).patch(patchUsers).delete(deleteUsers);

module.exports = router;
