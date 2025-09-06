// 163. Factory Functions: Reading

// inside handel factory
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

// inside tour controller db-----------model----populate
exports.getToursById = factory.getOne(Tour, { path: 'reviews' });

// implemented for user model;
exports.patchUsers  = factory.updateOne(userM)

// implemented for review model
exports.getReview = factory.getOne(Review)
