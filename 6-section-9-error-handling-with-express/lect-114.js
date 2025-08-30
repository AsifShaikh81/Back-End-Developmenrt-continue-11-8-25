// topic:lect 114. Implementing a Global Error Handling Middleware
//*all explaination in notebook 

// remember sec 8 and sec 9 code impleneted in sec 4 

// i created this middleware to create error
app.all('*', (req, res, next) => {
  //-----------------------------err.message
  const err = new Error(`Can't find ${req.originalUrl} on this server!`);
  err.statusCode = 404;
  err.status = 'fail';
  next(err) // this will jump to global error handler middleware
});
// i created this middleware to create error

// ---main global error handler middleware
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
// ---main global error handler middleware