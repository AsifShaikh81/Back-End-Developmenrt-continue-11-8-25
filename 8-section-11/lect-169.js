// 69. Calculating Average Rating on Tours - Pan 2
/* in this lecture we will learn if user update and delete review uss case mein rating average calculate kaise hoga  */

//! bug while deleging and updating  lecture  169
reviewSchema.pre(/^findOneAnd/, async function (next) {
  this.r = await this.findOne();
  console.log(this.r);
  next();
});

reviewSchema.post(/findOneAnd/, async function () {
  await this.r.constructor.calAverageRatings(this.r.tour);
});
// lecture  169