// Section 6:Topic: using third party middleware 'morgan'
// we will learn hoew to use third party middleware

const express = require('express');
const app = express();

const morgan = require('morgan'); //requiring/importing

//using third party middleware MORGAN
app.use(morgan('dev'));


const port = 3000;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});

app
  .route('/users')
  .get((req, res) => {
    res.status(200).json({
      status: 'success',
    });
  })
  .post((req, res) => {
    res.status(201).json({
      status: 'created',
    });
  });

//Morgan ek third-party middleware hai Express.js me jo basically tumhare server ke HTTP requests ka log banata hai.

// Simple shabdon me — jab bhi koi tumhare server pe request bhejta hai (GET, POST, PUT, etc.), Morgan us request ka record console me print kar deta hai — jaise method, URL, status code, time taken, etc.
