//Topic:Creating custom middleware

//server created
const express = require('express');
const app = express();
// app.use(express.json());f

const port = 4000;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});

//created custom middleware ,this middleware applies to each and every request.
//always define above the other middlewares and before the routes.
//how it works:
// incoming req ==> middleware1 ==> middleware2 ==> middleware3 ==> response. Check notebook for better understanding.

app.use((req, res, next) => {
  console.log('hello from middleware 👋');
  next(); //always define next(), if not it req/res cycle will be stuck and never send res back to client
});

//here creating custom middleware that modifies req object
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//created all http/route handlers
const getTours = (req, res) => {
  console.log(req.requestTime, 'from custom middleware');

  res.status(200).json({
    status: 'success',
    message: '<get>',
    requestedAt: req.requestTime,
  });
};

const postTours = (req, res) => {
  console.log(req.requestTime, 'from custom middleware');
  res.status(201).json({
    status: 'created',
    message: '<post>',
    requestedAt: req.requestTime,
  });
};

const patchTours = (req, res) => {
  res.status(202).json({
    status: 'success',
    message: '<patch>',
  });
};
const deleteTours = (req, res) => {
  res.status(204).json({
    status: 'success',
    message: '<delete>',
  });
};

app.route('/api/v1/tours').get(getTours).post(postTours);
app.route('/api/v2/tours/:id').put(patchTours).delete(deleteTours);
