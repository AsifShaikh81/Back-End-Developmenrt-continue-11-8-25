const mongoose = require('mongoose'); // require mongoose package
const slugify = require('slugify')
//creating Schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name cannob me empty'],
    trim: true, //trime remove white spaces
  },
  slug:String ,// for DOCUMENT MIDDLEWARE
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
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A price cannob me empty'],
  },
  priceDiscount: Number,
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
    select: false // excluding this for explaination check sec 8 9-app.js
  },

  startDates: [Date],

}, 
// ---------virtual---------
{
  toJSON: {virtuals:true},
  toObject:{virtuals:true}
});

tourSchema.virtual('durationweek').get(function () {
  return this.duration / 7;
  
})
// ---------virtual---------
//------DOCUMENT MIDDLEWARE-------
// Pre middleware (runs BEFORE the document is saved in DB)
tourSchema.pre('save', function (next) {
    // 'this' points to the current document in out cas 'tourSchems'
    this.slug = slugify(this.name,{lower:true})
    next() // move to the next middleware
})

// Post middleware (runs AFTER the document is saved in DB)
tourSchema.post('save',function (doc,next) {
     // 'doc' is the saved document
    console.log(doc);
    next();
    
    
})
//------DOCUMENT MIDDLEWARE-------


//creating model//collection
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
