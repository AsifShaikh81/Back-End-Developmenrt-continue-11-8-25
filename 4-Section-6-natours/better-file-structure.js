//TopicBette structure
//*config.env
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
// console.log(process.env);

const express = require('express');
const morgan = require('morgan');

const mongoose = require('mongoose'); // require mongoose package

//repalacing password in string
const DB = process.env.D_STRING.replace('<PASSWORD>', process.env.D_PASSWORD);

// connnecting database
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('database connected')); // using then bcz its return promise

//creating document
// const DOCUMENT = new Tour({
//   name: 'The forest Hiker',
//   price: 997,
// });

const app = express();
//*config.env
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log('Morgan enabled in development mode 🚀');
}
app.use(express.json());
//static files
app.use(express.static(`${__dirname}/starter/public`));

//routes
//const ToursRoute = require('./Routes/TourRoutes'); importing tour route module
const ToursRouteDB = require('./Routes/TourRoutes-DB'); //importing tour route module - DB
const UsersRoute = require('./Routes/UserRoutes'); // importing user route router

// app.use('/api/v1/tours', ToursRoute);
app.use('/api/v1/tours', ToursRouteDB); //--> DB
app.use('/api/v1/users', UsersRoute);

// sec 9 lect 112:Handlin Unhandled Routes
/* app.all('*', (req,res,next)=>{
  res.status(404).json({
    status: 'fail',
    message: `Can't find ${req.originalUrl} on this server!`
  });
}) */
// sec 9 lect 112:Handlin Unhandled Route

// lect 114. Implementing a Global Error Handling Middleware
// i created this middleware to create error
app.all('*', (req, res, next) => {
  //-----------------------------err.message
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.statusCode = 404;
  err.status = 'fail';
  next(err) 
});
// i created this middleware to create error

// ---main global error handler
app.use((err, req, res, next) => {
  //------------------  404
  err.statusCode = err.statusCode || 500;
  //------------- 'fail'
  err.status = err.status || 'error';
  
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
});
// ---main global error handler
// lect 114. Implementing a Global Error Handling Middleware

// module.exports = app // here exporting  'const app = express();'

//*config.env
const port = process.env.PORT || 3000; //process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});
