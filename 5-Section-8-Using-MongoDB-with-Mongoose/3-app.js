//topic:85. Creating a Simple Tour Model
//*creating express servver
const express = require('express');
const app = express();

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

// *creating database
const mongoose = require('mongoose');
const local_databse = 'mongodb://localhost:27017/learning'; //local databse
mongoose.connect(local_databse).then(
  () => console.log('local databse connected'), // connecting database
);

// *simple way to define scehma
// const schema1 = new mongoose.Schema({
//     name: String,
//     rating: Number,
//     pricr: Number
// });

//*Another way to define schema wiht validation
const schema2 = new mongoose.Schema({

  name: {
    type: String,
    required: [true, 'error:name cannot be empty'], // validation
  },
  rating: {
    type: Number,
    default: 4.8, // if there is no value by default it will set 4.8
  },
  price: {
    type: Number,
    required: [true, 'error:price cannot be empty'], // validation
  },
});

// *creating model/collection

const MODEL = mongoose.model('MODEL', schema2);

//*syntax
// mongoose.model(<'modelName'>,<schemaName>)
