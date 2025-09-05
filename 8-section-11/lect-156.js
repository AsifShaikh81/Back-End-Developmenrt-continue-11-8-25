// 156. Populating Reviews

// here populating tour and user prev we creared in lect 155

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
