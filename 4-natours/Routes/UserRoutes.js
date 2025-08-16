const express = require('express');
// const UserControllers = require('../Controllers/userControllers') // importing controllers
const {getAllUsers,postUsers,getUsers,patchUsers,deleteUsers} = require('../Controllers/userControllers') // importing controllers, another way of imporitng controllers called 'destructuring import'


const router = express.Router();

router.route('/').get(getAllUsers).post(postUsers);
router.route('/:id').get(getUsers).patch(patchUsers).delete(deleteUsers);

module.exports = router;
