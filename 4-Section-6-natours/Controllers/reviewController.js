const Review = require('../models/reviewModel');
// const tryCatchAsync = require('./../utils/try-catch-error-handler');
const factory = require('./handelFactory')


// using factory function for get all
exports.getAllReviews = factory.getAll(Review)
/* exports.getAllReviews = tryCatchAsync(async (req, res, next) => {

  let filter = {} // lect 160
if(req.params.tourID) filter = {tour:req.params.tourID}// lect 160
  const reviews = await Review.find(filter );

  res.status(200).json({
    status: 'success',
    results: reviews.length,
    data: {
      reviews,
    },
  });
}); */

// using factory function to get review 
exports.getReview = factory.getOne(Review)

//creating middleware for setting ids
exports.setUserId = (req,res,next)=>{
  if(!req.body.tour) req.body.tour = req.params.tourID;
  if(!req.body.user) req.body.user  = req.user.id 
  next()
}
// using handel factory for create
exports.createReview = factory.createOne(Review)
/* exports.createReview = tryCatchAsync(async (req, res, next) => {
     while posting if we manually dont specify tour id and user id in body then automatocally get tour and user id from url
    if(!req.body.tour) req.body.tour = req.params.tourID;
    if(!req.body.user) req.body.user  = req.user.id 
    
  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      rev: newReview,
    },
  });
}); */

// using handel factory for delete ,update ,create
exports.deleteReview = factory.deleteOne(Review)

exports.updateReview = factory.updateOne(Review)



