// global route :/api/v1/tours
const express = require('express');

const TourControllersDB = require('../Controllers/tourControllers-DB.js'); //importing controllers- databse

const router = express.Router();
//TourControllers.checkBody is param middleware define befoe creating that is before TourControllers.postTours
const authController = require('./../Controllers/authController.js')

// const ReviewController = require('./../Controllers/reviewController');
const Reviewrouter = require('./../Routes/ReviewRoute.js')

// router.route('/:tourID/reviews').post(authController.protectTourRoute,authController.restrictTo('user'),ReviewController.createReview )
router.use('/:tourID/reviews', Reviewrouter) // *LECT 159


router.route('/').get(/* authController.protectTourRoute, */TourControllersDB.getAllTours).post(authController.protectTourRoute,authController.restrictTo('user','lead-guide'),TourControllersDB.postTours);

router.route('/top-5-cheap').get(TourControllersDB.aliasTopTours, TourControllersDB.getAllTours);

router.route('/tour-stats').get(TourControllersDB.getTourStats);

router.route('/monthly-plan/:YEAR').get(authController.protectTourRoute,authController.restrictTo('user','lead-guide'),TourControllersDB.getMonthlyPlan);
router
  .route('/:ID')
  .get(TourControllersDB.getToursById)
  .patch(authController.protectTourRoute,authController.restrictTo('user','lead-guide'),TourControllersDB.updateTours)
  .delete(authController.protectTourRoute,authController.restrictTo('admin','lead-guide'),TourControllersDB.deleteTours);
//router.param('id',TourControllers.checkID) //param middleware


module.exports = router;
