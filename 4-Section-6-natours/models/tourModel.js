const mongoose = require('mongoose'); // require mongoose package
//creating Schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name cannob me empty'],
  },
  rating: {
    type: Number,
    default: 4.8,
  },
  price: {
    type: Number,
    required: [true, 'price cannob me empty'],
  },
});
//creating model
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour