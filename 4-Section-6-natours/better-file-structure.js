//TopicBette structure
// lect 123
/* process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('unhandled rejection 💥 shutting down..');
  process.exit(1);
}); */
//*config.env
const dotenv = require('dotenv');
// import { rateLimit } from 'express-rate-limit';  lect 143
const rateLimit = require('express-rate-limit');
const helmet = require('helmet'); // ;ect 144
//*lect 145
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
//*lect 145

const hpp = require('hpp'); //*lect 146

dotenv.config({ path: './config.env' });
// console.log(process.env);

const express = require('express');
const morgan = require('morgan');

const mongoose = require('mongoose'); // require mongoose package
const AppError = require('./utils/appError'); // lect 115
const globalErrorHandler = require('./Controllers/errorController'); // lect 115
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
//* ALL GLOBAL MIDDLEWARE
//* 5)helmet middleware  // lect 144
app.use(helmet());

//* 1)development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log('Morgan enabled in development mode 🚀');
}

//*lect 143
//* 2) rate limiter
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many req from this ip, pls try again in an hour ',
});
app.use('/api', limiter);
//*lect 143
//*3) body parser, reading data from the body into req.body
app.use(express.json({ limit: '10kb' })); //*body will recive 10 kb data ,more than that 10kb it will note recive kb =kilobyte/kilobite
//*4) serving static file(niddleware)
app.use(express.static(`${__dirname}/starter/public`));
// *lect 145
//*5) preventing no sql attack using express-mongo-sanitize npm package
app.use(mongoSanitize()); //* lect 145
app.use(xss());
// *lect 145
//*6)lec 146. Preventing Parameter Pollution
app.use(
  hpp({
    whitelist: ['duration'],
  }),
);

//routes
//const ToursRoute = require('./Routes/TourRoutes'); importing tour route module
const ToursRouteDB = require('./Routes/TourRoutes-DB'); //importing tour route module - DB
const UsersRoute = require('./Routes/UserRoutes'); // importing user route router
const ReviewRoute = require('./Routes/ReviewRoute') // importing review route


// app.use('/api/v1/tours', ToursRoute);
app.use('/api/v1/tours', ToursRouteDB); //--> DB
app.use('/api/v1/users', UsersRoute);
app.use('/api/v1/reviews', ReviewRoute)

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
/* app.all('*', (req, res, next) => {
  -----------------------------err.message
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.statusCode = 404;
  err.status = 'fail';
  next(err) 
}); */
// i created this middleware to create error

// ---main global error handler
/* app.use((err, req, res, next) => {
  ------------------  404
  err.statusCode = err.statusCode || 500;
  ------------- 'fail'
  err.status = err.status || 'error';
  
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}); */
// ---main global error handler
// lect 114. Implementing a Global Error Handling Middleware

// sec 9 lect 115.Better Errors and Refactoring----------------

app.all('*', (req, res, next) => {
  next(new AppError(`cant finr ${req.originalUrl} on this servver`), 404);
});

app.use(globalErrorHandler);

// sec 9 lect 115.Better Errors and Refactoring----------------

// module.exports = app // here exporting  'const app = express();'

//*config.env
const port = process.env.PORT || 3000; //process.env.PORT || 3000;
// lect 122 assign 'server'
const server = app.listen(port, () => {
  console.log(`App running on ${port}`);
});

/* process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('unhandled rejection 💥 shutting down..');
  server.close(() => {
    process.exit(1);
  });
}); */
