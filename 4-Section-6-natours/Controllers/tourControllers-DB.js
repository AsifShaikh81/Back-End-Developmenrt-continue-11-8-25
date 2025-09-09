const Tour = require('../models/tourModel'); //importing tourmodel from models folder
//const ApiFeatures = require('../utils/apifeatures'); // importing class created for filtering,sorting,field limiting,paginationf
const tryCatchAsync = require('./../utils/try-catch-error-handler');
const AppError = require('./../utils/appError'); // lect 117
const factory = require('./handelFactory');
// -----topic:alias 100---- //!bug
// here what middleware doing before it reach 'getAllTours' function middleware prefils req object with all this(  req.query.limit = '5';
// req.query.sort = '-ratingsAverage,price';
//  req.query.fields = 'name,price,ratingsAverage,duration';),
// so user dont have to do this if user hit '/top-5-cheap' user will get already sorted query

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};
// -----topic:alias 100----
// using factory function to get all
exports.getAllTours = factory.getAll(Tour);
//=======================start=================================
// exports.getAllTours = tryCatchAsync(async (req, res, next) => {
//const tours = await Tour.find(); // get all the data
// -----------TOPIC-95-99-------------------

// * --------filtering,sorting,field limiting,pagination using as a class-------
// BUILD QUERY
// 1A) Filtering
// const queryObj = { ...req.query }; // storing query object
// const excludedFields = ['page', 'sort', 'limit', 'fields']; // a query/fields we want to delete/exclude
// excludedFields.forEach((el) => delete queryObj[el]); // looping in 'excludedFields' and deleting field from 'req.query'

// 1B) Advance Filtering
// let qStr = JSON.stringify(queryObj); // convert 'req.query' a js obj to string

// qStr = qStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); //replacing 'gte,gt,lte,lt' with $gte,$gt,$lte,$lte
// console.log(req.query, JSON.parse(qStr));

// let query = Tour.find(JSON.parse(qStr)); // convert 'req.query' a js object to string */

//!note req.params → comes from route parameters like /tours/:id
//!req.query → comes from query string like ?sort=-price
// 2) SORTING
//   if (req.query.sort) {
//   If 'sort' is provided in the query string (e.g. ?sort=price or ?sort=-price)

//     const sortBy = req.query.sort.split(',').join(' ');
//   Convert 'price,ratingsAverage' into 'price ratingsAverage'
//   Mongoose expects space-separated fields for sorting

//     console.log(sortBy);
//   Just for debugging: logs the fields we are sorting by

//     query = query.sort(sortBy);
//   Apply sorting to the query based on the fields provided
//   } else {
//     query = query.sort('-createdAt');
//   If no sort query is provided, sort results by 'createdAt' field in descending order (newest first)
//   }

//3) FIELD LIMITING
//   if (req.query.fields) {
//   If 'fields' is provided in the query string (e.g. ?fields=name,price)

//   const fieldss = req.query.fields.split(',').join(' ');
//    Convert 'name,price' into 'name price' because mongoose .select() expects space-separated fields

//   query = query.select(fieldss);
//    Select only the specified fields from the database
// } else {
//   query = query.select('-__v');
//    If no 'fields' query is provided, exclude the '__v' field by default
// }

//4)PAGINATION //!bug
//  const pages = req.query.page * 1 || 1;
//  Convert page to number (default = 1).
//  Example: ?page=2 → pages = 2

// const limits = req.query.limit * 1 || 100;
//  Convert limit to number, default is 100
//  Example: ?limit=3 → limits = 3

// const skips = (pages - 1) * limits;
//  How many documents to skip before fetching results.
//   Example: page=2, limit=10 → skip = (2-1)*10 = 10

// query = query.skip(skips).limit(limits);
//  Apply skip & limit to the mongoose query
//  Example: skip(3).limit(3) → fetches docs 4–6

// if (req.query.page){
//    Check if the user has provided a "page" query parameter in the URL
//    Example: /api/v1/tours?page=2&limit=10
//    If no page is passed, we skip this block

//   const numTours = await Tour.countDocuments(); //countDocuments()= count number of document exist in collection

//   if (skips >= numTours) throw new Error('page not exist');
//    'skips' is how many documents we skip before fetching results
//    If skips is greater than or equal to total documents,
//    it means the user asked for a page number that doesn't exist
//    In that case, throw an error with message "page not exist"
// }
// console.log({ page: pages, limit: limits, skip: skips });

// const query= Tour.find(quryobj)
//EXECUTE QUERY
//*----------------------------------query-------queryStr--
// const features = new ApiFeatures(Tour.find(), req.query).filter().sort().limitFields().paginate();
// const tours = await features.query;
// const tours = await query;
// * --------filtering,sorting,field limiting,pagination using as a class-------

// three ways for query
//normal way of query
// const tours = await Tour.find({
//   duration: 5,
//   difficulty: 'easy',
// });

//Another way of query
// const tours = await Tour.find().where('duration').equals(5).where('difficulty').equals('easy');

//simplest way of query
// const tours = Tour.find(req.query)
// -----------TOPIC-95-------------------
//   res.status(200).json({
//     status: 'success',
//     results: tours.length,
//     data: {
//       tours,
//     },
//   });
// });
//=========================end===========================

// using factory function to get
exports.getToursById = factory.getOne(Tour, { path: 'reviews' });
/* exports.getToursById = tryCatchAsync(async (req, res, next) => {
  const DATA = await Tour.findById(req.params.ID).populate('reviews'); // GET DATA BY id ,req.param.ID ka .ID = /:ID(route) must be same
   Tour.findOne({ _id: req.params.ID}) // THIS WORK SAME AS ABOVE CODE
   Tour.findOne({filter:property we searching for value:value we want search for})

  if (!DATA) {
    return next(new AppError(`not tour found with that id`, 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      DATA,
    },
  });
}); */

//*factory function for creaing
exports.postTours = factory.updateOne(Tour);
/* 
exports.postTours = tryCatchAsync(async (req, res, next) => {
  general way of creating document
    const doc = new Tour({})
  doc.save

  another way of creating document
  const doc = await Tour.create(req.body); //create data

  if (!doc) {
    return next(new AppError(`not tour found with that id`, 404));
  }
  res.status(201).json({
    status: 'created-successfuly',
    data: {
      doc,
    },
  });
}); */

// using update handel factory
exports.updateTours = factory.updateOne(Tour);
/* exports.updateTours = tryCatchAsync(async (req, res, next) => {
  //syntax <modelName>.findByIdAndUpdate(id, updateValue, option)
  const update = await Tour.findByIdAndUpdate(req.params.ID, req.body, { new: true, runValidators: true }); // it will update by id
  if (!update) {
    return next(new AppError(`not tour found with that id`, 404));
  }

  res.status(202).json({
    status: 'success',
    data: {
      update,
    },
  });
});
 */
// lect 161: using factory function for delete
exports.deleteTours = factory.deleteOne(Tour);
/* exports.deleteTours = tryCatchAsync(async (req, res, next) => {
  const del = await Tour.findByIdAndDelete(req.params.ID);
   lec:117. Adding 404 Not Found Errors
  if (!del) {
    return next(new AppError(`not tour found with that id`, 404));
  }
   lec:117. Adding 404 Not Found Errors
  res.status(204).json({
    status: 'success',
    data: {
      del,
    },
  });
}); */

// ---------topic: lect:102-----
exports.getTourStats = tryCatchAsync(async (req, res, next) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' }, //$toUpper conver to uppercase, difficulty field ko uppercase mein kardega
        countTours: { $sum: 1 }, // counting number of tours for each difficulty
        numRating: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        maxPrice: { $max: '$price' },
        minPrice: { $min: '$price' },
      },
    },
    {
      //------new field name
      $sort: { avgPrice: 1 }, // here we using new field name 'avgPrice' not old field name 'price' kyu ki ye stage by stage work karta hai
    },
    // {
    //   $match: { _id: { $ne: 'EASY' } }, // u can repeat stages
    // },
  ]);
  console.log('🔥 Stats from DB:', stats);
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

// -----topic 103------------
exports.getMonthlyPlan = tryCatchAsync(async (req, res, next) => {
  //----converting string to number
  const year = req.params.YEAR * 1; // YEAR-> USER WILL DEFINE IN URL 2021

  const plan = await Tour.aggregate([
    {
      $unwind: '$startDates', // unwrap startDates array
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`), // create new date and match with document
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' }, // $month = Returns the month for a date as a number between 1 (January) and 12 (December).
        numTourStarts: { $sum: 1 }, // counting number of tours for each months
        tours: { $push: '$name' }, // collects values into an array
      },
    },
    {
      $addFields: { month: '$_id' }, // add new field, month-> a field we want to add, $_id -> The value we assign to month field
    },
    {
      $project: {
        _id: 0, // 0 = hide ,1 = show
      },
    },
    {
      $sort: { numTourStarts: -1 }, //positive 1 asc , negative -1 des
    },
    {
      $limit: 12, // only return 12 documents
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});

// /tours-within/:distance/center/:latlng/unit/:unit
exports.getToursWithin = async (req, res, next) => {
  const { distance, latlng, unit } = req.params; //
  const [lat, lng] = latlng.split(','); //
  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;
  if (!lat || !lng) {
    return next(new AppError('Please provide latitude and longitude in format lat,lng', 400));
  }

  console.log(distance, lat, lng, unit);

  const tours = await Tour.find({ startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } } });

  res.status(200).json({
    status: 'success',
    data: {
      data: tours,
    },
  });
};

exports.getDistance = async (req, res) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;

  if (!lat || !lng) {
    return next(new AppError('Please provide latitude and longitude in format lat,lng', 400));
  }

  const tours = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: tours,
    },
  });
};
