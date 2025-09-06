const tryCatchAsync = require('./../utils/try-catch-error-handler');
const AppError = require('./../utils/appError');
const ApiFeatures = require('../utils/apifeatures');

exports.deleteOne = (Model) =>
  tryCatchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.ID);

    if (!doc) {
      return next(new AppError(`not doc found with that id`, 404));
    }

    res.status(204).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.updateOne = (Model) =>
  tryCatchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.ID, req.body, { new: true, runValidators: true }); // it will update by id
    if (!doc) {
      return next(new AppError(`not tour found with that id`, 404));
    }

    res.status(202).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.createOne = (Model) =>
  tryCatchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    if (!doc) {
      return next(new AppError(`not tour found with that id`, 404));
    }
    res.status(201).json({
      status: 'created-successfuly',
      data: {
        doc,
      },
    });
  });

exports.getOne = (Model, popOption) =>
  tryCatchAsync(async (req, res, next) => {
    // here we have populate so uske liye code likh rahe alag se baki sab same hai
    // this 3 code is same as below
    let query = Model.findById(req.params.ID);
    if (popOption) query = query.populate(popOption);
    const doc = await query;
    // this 3 code is same as below
    // const DATA = await Tour.findById(req.params.ID).populate('reviews');

    if (!doc) {
      return next(new AppError(`not document found with that id`, 404));
    }
    res.status(200).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

exports.getAll = (Model) =>
  tryCatchAsync(async (req, res, next) => {
    // for review model, it allows nested route
    // filter for review model
    let filter = {};
    // filter for review model
    if (req.params.tourID) filter = { tour: req.params.tourID };

    const features = new ApiFeatures(Model.find(filter), req.query).filter().sort().limitFields().paginate();

    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        doc,
      },
    });
  });

//! key note
// remeber factoey function be used for all model
//   factory functions return another function
