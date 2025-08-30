//topic: 115. Better Errors and Refactoring
//* all explaination in notebook

// remember sec 8 and sec 9 code impleneted in sec 4 

// 1)creating error class inside utils folder
// topic : sec 9 lec 115

// extends: inheriting built in Error class in our AppError created class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // super:calling Error buil-in class ,'message' inside super comes from Error buil-in class

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'; // if status code starts with 4 it will give fail or error 
    this.isOperationsl = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError; // exporting in main file (better-file-structure.ja)

//2) creating error controller in controller folder
module.exports = (err, req, res, next) => {
  //------------------  404
  err.statusCode = err.statusCode || 500;
  //------------- 'fail'
  err.status = err.status || 'error';

  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
}; // exporting in main file (better-file-structure.ja)

// 3)using in main file better file structure

app.all('*', (req, res, next) => {
  next(new AppError(`cant finr ${req.originalUrl} on this servver`), 404);
});

app.use(globalErrorHandler);
