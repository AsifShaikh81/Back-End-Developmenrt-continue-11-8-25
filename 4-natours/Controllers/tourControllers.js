const fs = require('fs');
const express = require('express');
const app = express();
app.use(express.json());

const Readtours = JSON.parse(fs.readFileSync(`${__dirname}/../starter/dev-data/data/tours-simple.json`));

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: Readtours.length,
    data: {
      tours: Readtours,
    },
  });
};
exports.getToursById = (req, res) => {
  const id = req.params.id * 1;
  const x = Readtours.find((el) => el.id === id);

  if (!x) {
    return res.status(404).json({
      status: 'failed',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      x,
    },
  });
};

exports.postTours = (req, res) => {
  const newId = Readtours[Readtours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  Readtours.push(newTour);

  fs.writeFile(`${__dirname}/../starter/dev-data/data/tours-simple.json`, JSON.stringify(Readtours), (err) => {
    //201 code means created
    res.status(201).json({
      status: 'created-successfuly',
      data: {
        Readtours: newTour,
      },
    });
  });
};

exports.patchTours = (req, res) => {
  if (req.params.id * 1 > Readtours.length) {
    return res.status(404).json({
      status: '404 Invalid id',
    });
  }
  res.status(202).json({
    status: 'success',
    message: '<patch>',
  });
};
exports.deleteTours = (req, res) => {
  if (req.params.id * 1 > Readtours.length) {
    return res.status(204).json({
      status: 'No Content',
    });
  }
  res.status(204).json({
    status: 'success',
    message: '<delete>',
  });
};
