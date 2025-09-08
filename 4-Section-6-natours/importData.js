// 94. Importing Development Data
// here we creating a script to automatically import data from jason file to database

const dotenv = require('dotenv');
const fs = require('fs');
const mongoose = require('mongoose'); // require mongoose package

const Tour = require('./models/tourModel');
const Review = require('./models/reviewModel');
const user = require('./models/userModel');

dotenv.config({ path: './config.env' });
// console.log(process.env);

//repalacing password in string
const DB = process.env.D_STRING.replace('<PASSWORD>', process.env.D_PASSWORD);

// connnecting database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('database connected'));

//Reading json  data
const readFile = JSON.parse(fs.readFileSync(`${__dirname}/starter/dev-data/data/tours.json`));
const revreadFile = JSON.parse(fs.readFileSync(`${__dirname}/starter/dev-data/data/reviews.json`));
const userreadFile = JSON.parse(fs.readFileSync(`${__dirname}/starter/dev-data/data/users.json`));

//IMPORT DATA TO DATABASE
const importData = async () => {
  try {
    await Tour.create(readFile); //Bulk insert all data from JSON into the collection.
    await Review.create(revreadFile); //Bulk insert all data from JSON into the collection.
    await user.create(userreadFile,{validateBeforeSave:false}); //Bulk insert all data from JSON into the collection.
    console.log('data successfully loaded');
    process.exit(); // it will forcefully exit after above operations executed
  } catch (err) {
    console.log(err);
  }
};

// DELETE ALL THE DATA IN DATABASE
const deleteData = async () => {
  try {
    await Tour.deleteMany(); // Delete all records from the tours collection
   await Review.deleteMany(); //Bulk insert all data from JSON into the collection.
    await user.deleteMany(); // Delete all records from the tours collection
    console.log('data successfully deleted');
    process.exit(); // it will forcefully exit after above operations executed
  } catch (err) {
    console.log(err);
  }
};

console.log(process.argv);

//to understand if else check ' console.log(process.argv)' in console
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

//* how to use ?
//* first change the file(readFile) u want to import and run the import cmd to import file in database
//* cmd to delete  node importData.js --delete
//* cmd to import  node importData.js --import