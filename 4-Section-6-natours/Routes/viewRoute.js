// app.use('/', viewRoute) global route
const express = require('express');
const router = express.Router();
const viewsController = require('./../Controllers/viewController');
const authController = require('./../Controllers/authController')

//*lect -180
router.get('/signup',viewsController.getSignUp)
router.use(authController.isLoggedIn);
// router.get('/', authController.isLoggedIn,viewsController.getOverview);
router.get('/', viewsController.getOverview);

// router.get('/tour/:slug', authController.isLoggedIn,viewsController.getTour);
router.get('/tour/:slug', viewsController.getTour);
//*lect -180

// router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get('/login', viewsController.getLoginForm);

router.get('/me', authController.protectTourRoute, viewsController.getAccount);

router.post(
  '/submit-user-data',
  authController.protectTourRoute,
  viewsController.updateUserData
);

module.exports = router;
