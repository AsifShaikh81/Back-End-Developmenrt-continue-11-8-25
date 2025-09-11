const express = require('express');
const router = express.Router();
const viewsController = require('./../Controllers/viewController');
const authController = require('./../Controllers/authController')

//*lect -180
router.get('/', authController.isLoggedIn,viewsController.getOverview);

router.get('/tour/:slug',  authController.isLoggedIn,viewsController.getTour);
//*lect -180

router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/me', authController.protectTourRoute, viewsController.getAccount);

router.post(
  '/submit-user-data',
  authController.protectTourRoute,
  viewsController.updateUserData
);

module.exports = router;
