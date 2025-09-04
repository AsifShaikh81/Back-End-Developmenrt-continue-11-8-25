// lect 153: populating tour guide

//* in tour controller db js file 
//!bug

 guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'userModel',
      },
    ],

    //* writing query middleware to populate data for all find query
    tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});
  