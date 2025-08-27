// topic:lect 114. Implementing a Global Error Handling Middleware
//*xall explaination in notebook 

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