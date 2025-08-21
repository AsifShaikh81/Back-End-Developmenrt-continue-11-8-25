// const fs = require('fs');
const Tour = require('../models/tourModel'); //importer tourmodel from models folder
const express = require('express');
const app = express();
app.use(express.json());

exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find(); // get all the data
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};
exports.getToursById = async (req, res) => {
  try {
    const DATA = await Tour.findById(req.params.ID); // GET DATA BY id ,req.param.ID ka .ID = /:ID(route) must be same
    // Tour.findOne({ _id: req.params.ID}) // THIS WORK SAME AS ABOVE CODE
    // Tour.findOne({filter:property we searching for value:value we want search for})

    res.status(200).json({
      status: 'success',
      data: {
        DATA,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err.message,
    });
  }
};

exports.postTours = async (req, res) => {
  try {
    //general way of creating document
    //  const doc = new Tour({})
    //doc.save

    //another way of creating document
    const doc = await Tour.create(req.body); //create data

    res.status(201).json({
      status: 'created-successfuly',
      data: {
        doc,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.updateTours = async (req, res) => {
  try {
    //syntax <modelName>.findByIdAndUpdate(id, updateValue, option)
    const update = await Tour.findByIdAndUpdate(req.params.ID, req.body, { new: true, runValidators: true }); // it will update by id
    res.status(202).json({
      status: 'success',
      data: {
        update,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};

exports.deleteTours = async (req, res) => {
  try {
    const del = await Tour.findByIdAndDelete(req.params.ID);
    res.status(204).json({
      status: 'success',
      data: {
        del,
      },
    });
  } catch (error) {
    res.status(404).json({
      status: 'failed',
      message: error.message,
    });
  }
};
