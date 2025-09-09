// rating / createdAt / ref to user / ref to tour

const mongoose = require('mongoose');
const Tour = require('./tourModel');

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
      set: val => Math.round(val * 10)/10 //4.66666, 46.6666. 47, 4.7
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
reviewSchema.index({tour:1,user:1},{unique:true }) //lect 170
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
reviewSchema.statics.calAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);
  console.log(stats);
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  }
  //else {
  //   await Tour.findByIdAndUpdate(tourId, {
  //     ratingsQuantity: 0,
  //     ratingsAverage: 4.5,
  //   });
  // }
};

reviewSchema.post('save', function () {
  this.constructor.calAverageRatings(this.tour);
});
// lecture  169
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  console.log(this.r);
  next();
});

reviewSchema.post(/findOneAnd/, async function () {
  await this.r.constructor.calAverageRatings(this.r.tour);
});
// lecture  169
const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
