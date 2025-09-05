//*155. Creating and Getting Reviews

//*in this lecture we did:
//*created Reviews controller
const Review = require('../models/reviewModel');
const tryCatchAsync = require('./../utils/try-catch-error-handler');

exports.getAllReviews = tryCatchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
});
exports.createReview = tryCatchAsync(async (req, res, next) => {
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      rev: newReview,
    },
  });
});

//*created review route
const express = require('express');
const router = express.Router();

const ReviewController = require('./../Controllers/reviewController');
const authController = require('./../Controllers/authController')

router.route('/').get(ReviewController.getAllReviews).post(authController.protectTourRoute,authController.restrictTo('user'),ReviewController.createReview);

module.exports = router;

//*imported in better file structure js file
app.use('/api/v1/reviews', ReviewRoute)

