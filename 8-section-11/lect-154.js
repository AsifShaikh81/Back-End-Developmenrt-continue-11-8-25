// 154. Modelling Reviews: Parent Referencing
// in his lecture we created review model and implement parent refrencing method
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
    //*parent refrencing 
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
    //*parent refrencing 
  },

  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

const Review = mongoose.model('review', reviewSchema);

module.exports = Review;

//what is virtual property?, virtual property already tumhne padha hai 
/* virtual property,
basically a field that is not stored in the database
but calculated using some other value. */