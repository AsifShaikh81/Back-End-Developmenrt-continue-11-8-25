// const fs = require('fs');
const TourModel = require('./../models/tourModel'); //importer tourmodel from models folder
const express = require('express');
const app = express();
app.use(express.json());

// const Readtours = JSON.parse(fs.readFileSync(`${__dirname}/../starter/dev-data/data/tours-simple.json`)); //*cmt bcz of model
// param middleware logic
// exports.checkID = (req, res, next, value) => {
//   if (req.params.id * 1 > Readtours.length) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'invalid id',
//     });
//   }
//   next();
// };

exports.checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    //*cmt bcz of model
    // results: Readtours.length,
    // data: {
    //   tours: Readtours,
    // },
    //*cmt bcz of model
  });
};
exports.getToursById = (req, res) => {
  const id = req.params.id * 1;
  const x = Readtours.find((el) => el.id === id);
  //all this logics written in param middleware
  //*cmt bcz of model
  // if (!x) {
  //   return res.status(404).json({
  //     status: 'failed',
  //   });
  // }

  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     x,
  //   },
  // });
  //*cmt bcz of model
};

exports.postTours = (req, res) => {
  //*cmt bcz of model
  // const newId = Readtours[Readtours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // Readtours.push(newTour);

  // fs.writeFile(`${__dirname}/../starter/dev-data/data/tours-simple.json`, JSON.stringify(Readtours), (err) => {
  //   //201 code means created
  //   res.status(201).json({
  //     status: 'created-successfuly',
  //     data: {
  //       Readtours: newTour,
  //     },
  //   });
  // });
  //*cmt bcz of model

   res.status(201).json({
      status: 'created-successfuly',
      // data: {
      //   Readtours: newTour,
      // },
    });
};

exports.patchTours = (req, res) => {
  //all this logics written in param middleware
  // if (req.params.id * 1 > Readtours.length) {
  //   return res.status(404).json({
  //     status: '404 Invalid id',
  //   });
  // }
  res.status(202).json({
    status: 'success',
    message: '<patch>',
  });
};
exports.deleteTours = (req, res) => {
  //all this logics written in param middleware
  // if (req.params.id * 1 > Readtours.length) {
  //   return res.status(204).json({
  //     status: 'No Content',
  //   });
  // }
  res.status(204).json({
    status: 'success',
    message: '<delete>',
  });
};
