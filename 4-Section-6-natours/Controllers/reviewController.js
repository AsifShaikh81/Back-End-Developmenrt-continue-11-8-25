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
    // while posting if we manually dont specify tour id and user id in body then automatocally get tour and user id from url
    if(!req.body.tour) req.body.tour = req.params.tourID;
    if(!req.body.user) req.body.user  = req.user.id 
    
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      rev: newReview,
    },
  });
});
