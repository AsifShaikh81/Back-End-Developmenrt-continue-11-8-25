const AppError = require('../utils/appError'); // for lect 119

// lect 119
const handleCastErrorDB = (err) => {
  const mesg = `invalid ${err.path}:${err.value}`;
  return new AppError(mesg, 404);
};

// lect 120
const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]; // regex to find text in between qoutes" " ,errmsg returns array so we selecting first element by [0]
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

// lec 121
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err,req, res) => {
  if (req.originalUrl.startsWith('/api')){
     res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
  }
   // B) RENDERED WEBSITE
  console.error('ERROR 💥', err);
  return res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    msg: err.message
  });
 
};

const sendErrorProd = (err,req, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'something went very wrong',
    });
  }
};

module.exports = (err, req, res, next) => {
  //------------------  404
  err.statusCode = err.statusCode || 500;
  //------------- 'fail'
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err,req, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err }; // lect 119 //! minor bug

    if (error.name === 'CastError') error = handleCastErrorDB(error); // lect 119
    sendErrorProd(error, res); // lect 119 changeg err to error
    // lect 120 //! minor bug
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    // lec 121 //! minor bug
    if (error.name === 'ValidationError') error = handleValidationErrorDB(error);

    sendErrorProd(error, req, res);
  }
}; // exporting in main file (better-file-structure.js)
