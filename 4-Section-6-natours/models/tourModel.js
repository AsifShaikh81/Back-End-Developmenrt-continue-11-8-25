const mongoose = require('mongoose'); // require mongoose package
//creating Schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name cannob me empty'],
    trim: true, //trime remove white spaces
  },
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
});
//creating model//collection
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
