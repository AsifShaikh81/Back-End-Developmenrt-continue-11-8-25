// lect 153: populating tour guide

//* in tour controller db js file 
//!bug
// check lect 156 bug fixed

 guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'userModel',
      },
    ],

    // ------------------------main focus-----------------------
    //* writing query middleware to populate data for all find query
    tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});
  
// populate() ---> get the whole document  
// path ----> refering to the field which we want to populate 
// select : its not the main part of the lecture we using select to hide '__v passwordChangedAt', this field
// mongoose.Schema.ObjectId, ---> it will get the id of the refering model , in this case we ref 'userModel' so it will get userModel id 