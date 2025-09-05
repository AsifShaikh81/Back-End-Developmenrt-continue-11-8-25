// rating / createdAt / ref to user / ref to tour

const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'rev cannot be empty'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'userModel',
      required: [true, 'Review must belong to a user'],
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

reviewSchema.pre(/^find/, function (next) {
  // if u want populate 2 fields u use 2 populate() , if 3 then u use 3 populate()
  this.populate({
    path: 'user', // this 'user'field creted in review model
    select: 'name', // i want to show only name field
  }).populate({
    path: 'tour', // this 'tour'field creted in review model
    select: 'name photo', //  want to show only name and photo field
  });

  next();
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
