const mongoose = require('mongoose'); // require mongoose package
const slugify = require('slugify');
const userM = require('./userModel');
const { promises } = require('nodemailer/lib/xoauth2');
// const validator = require('validator');
//creating Schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'name cannob me empty'],
      trim: true, //trime remove white spaces
      maxlength: [40, 'A tour name must have less or equal then 40 characters'],
      minlength: [10, 'A tour name must have more or equal then 10 characters'],
      // validate: [validator.isAlpha,'name must be a alpha '] external validator
    },
    slug: String, // for DOCUMENT MIDDLEWARE
    rating: {
      type: Number,
      default: 4.8,
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A price cannob me empty'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // Only works when creating NEW doc (not on update)
          return val < this.price;
        },
        message: `Dicscount price ({VALUE}) must be below regular price `,
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String], //array of images: stores multiple imgs

    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, // excluding this for explaination check sec 8 9-app.js
    },

    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
    //*sec 11 lect 150
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    //*sec 11 lect 150

    //*lect 151
    // guides: Array, // it contains users/guides id

    //* lect 152
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'userModel',
      },
    ],
  },
  // ---------virtual properties---------
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// durationweek is field which we set virtually 
// duration is actuall field from the schema 
tourSchema.virtual('durationweek').get(function () {
  return this.duration / 7;
});

//*lect 157
tourSchema.virtual('reviews',{
  ref:'Review', // referencing to review model(connecting)
  foreignField:'tour', //for connecting review and tour model, this tour fiels inside review model 
  localField:'_id' // '_id' is a primary key of tour document 
})
//*lect 157

// ---------virtual properties---------
//------DOCUMENT MIDDLEWARE-------
// Pre middleware (runs BEFORE the document is saved in DB)
tourSchema.pre('save', function (next) {
  // 'this' points to the current document in out cas 'tourSchems'
  this.slug = slugify(this.name, { lower: true });
  next(); // move to the next middleware
});

// Post middleware (runs AFTER the document is saved in DB)
tourSchema.post('save', function (doc, next) {
  // 'doc' is the saved document
  console.log(doc);
  next();
});

//* lect 151
/* tourSchema.pre('save', async function (next) {
  const guidePromises = this.guides.map(async (id) => await userM.findById(id)); // return multiple promises bcz its looping and contain multiple user data

  this.guides = await Promise.all(guidePromises); // catch the all prmise output
  next();
}); */
//* lect 151
//------DOCUMENT MIDDLEWARE-------
//------QUERY MIDDLEWARE-------
//*lect 153
tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});

// tourSchema.pre('find', function (next) {
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});

// tourSchema.post('find', function (docs, next) {
tourSchema.post(/^find/, function (docs, next) {
  console.log(docs);
  next();
});
//------QUERY MIDDLEWARE-------
//------AGGREGATION MIDDLEWARE------
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});
//------AGGREGATION MIDDLEWARE-------

//creating model//collection
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
