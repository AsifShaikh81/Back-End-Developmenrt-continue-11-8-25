/* 168. Calculating Average Rating on Tours - Part 1

humne ab tak average rating ko khud define kiya hai, humne koii aise function hii nahi likha jab user review add kare delete kare ya update kare tab automatically calulate hojaye average rating , ye lecture mein hum averag rating ko calculate  karne ke liye function banaynge, kaise? using aggregation static method */

// inside rev model
reviewSchema.statics.calAverageRatings = async function (tourId) {
  const stats = this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: 'rating' },
      }
    },
  ]);
  console.log(stats);
  
  await Tour.findByIdAndUpdate(tourId,{
    ratingsQuantity: stats[0].nRating,
    ratingsAverage: stats[0].avgRating
    

  })
};

reviewSchema.post('save',function(){
  this.constructor.calAverageRatings(this.tour)
})
const Review = mongoose.model('Review', reviewSchema);


/* this.constructor,
this==> points to current document,
constructor ==> points to the model who created that document */

// why we using static method cuz using aggregatw