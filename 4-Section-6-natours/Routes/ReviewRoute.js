// global route:'/api/v1/reviews'

const express = require('express');
const router = express.Router({ mergeParams: true });

const ReviewController = require('./../Controllers/reviewController');
const authController = require('./../Controllers/authController');

router.use(authController.protectTourRoute) // lect 165
router
  .route('/')
  .get(ReviewController.getAllReviews)
  .post(authController.restrictTo('user'), ReviewController.setUserId, ReviewController.createReview);


router
  .route('/:ID')
  .get(ReviewController.getReview)
  .patch(authController.restrictTo('user'),ReviewController.updateReview)
  .delete(authController.restrictTo('user'),ReviewController.deleteReview);

module.exports = router;
