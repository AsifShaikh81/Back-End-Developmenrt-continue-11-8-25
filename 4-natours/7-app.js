//Topic:Refactoring Our Routes

//server created
const express = require('express');
const app = express();

const port = 4000;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});

//created all http handlers
const getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: '<get>',
  });
};

const postTours = (req, res) => {
  res.status(201).json({
    status: 'created',
    message:'<post>'
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

// app.route() Express.js ka ek shortcut hai jo ek hi URL endpoint par multiple HTTP methods (GET, POST, PUT, DELETE, etc.) ko chain karke likhne ka tarika deta hai, jisse code clean, readable aur maintain karna easy ho jata hai.
app.route('/api/v1/tours').get(getTours).post(postTours)

//now here changing url so using new app.route() aur app.route se alag alag urls bhi add karna easy hoo jata hai
app.route('/api/v2/tours/:id').put(patchTours).delete(deleteTours)
