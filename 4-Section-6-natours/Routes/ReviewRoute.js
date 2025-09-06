// global route:'/api/v1/reviews'

const express = require('express');
const router = express.Router({ mergeParams: true });

const ReviewController = require('./../Controllers/reviewController');
const authController = require('./../Controllers/authController');

router
  .route('/')
  .get(ReviewController.getAllReviews)
  .post(
    authController.protectTourRoute,
    authController.restrictTo('user'),
    ReviewController.setUserId,
    ReviewController.createReview,
  );

router.route('/:ID').get(ReviewController.getReview).patch(ReviewController.updateReview).delete(ReviewController.deleteReview);

module.exports = router;
