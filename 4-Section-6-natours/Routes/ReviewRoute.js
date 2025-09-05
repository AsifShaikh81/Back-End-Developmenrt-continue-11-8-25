const express = require('express');
const router = express.Router();

const ReviewController = require('./../Controllers/reviewController');
const authController = require('./../Controllers/authController')

router.route('/').get(ReviewController.getAllReviews).post(authController.protectTourRoute,authController.restrictTo('user'),ReviewController.createReview);

module.exports = router;
