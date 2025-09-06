//*161. Buildin Handler Factory Functions: Delete
/* 
In this video,

we're gonna be building a handler factory function
in order to delete review documents,
but also documents from all the other collections,
all with one simple function. */

// why factory function?
/* So, as I mentioned right at the beginning of this section,
adding very similar handlers to all of our controllers
will create a lot of duplicate code, right?
Because all these update handlers,
or all these delete handlers,
or all these create handlers,
they really all just look basically the same, right?
Also, imagine that we wanted to change
like some https status code or status message.
Then we would have to go into each and every controller
and then change all the handlers in there.
And so, instead of manually writing all these handlers,
why not simply create a factory function
that's gonna return these handlers for us? */

// what is factory function?
/* A factory function is a normal function that returns objects.
It’s an alternative to using constructors or classes for object creation. */

// https://chatgpt.com/c/68bbf2d0-db9c-8328-8f39-f006b0cdfddd

// created handel factory function for delete inside handelFactory.js
const tryCatchAsync = require('./../utils/try-catch-error-handler');
const AppError = require('./../utils/appError');

exports.deleteOne = (Model) =>
  tryCatchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.ID);
    // lec:117. Adding 404 Not Found Errors
    if (!doc) {
      return next(new AppError(`not doc found with that id`, 404));
    }
    // lec:117. Adding 404 Not Found Errors
    res.status(204).json({
      status: 'success',
      data: {
        doc,
      },
    });
  });

// inside tour controller db js file
const factory = require('./handelFactory'); // imported factory function
//actual fn in TC-db--factory fn name---modelname
exports.deleteTours = factory.deleteOne(Tour); // using
// fn = function
//  TC-db = tourcontroller -db

//  now i can use these delete factory function for any model i want

// =====================================================================
// also impleted delete handel factory for deleting reviews
// inside review controller
const factory = require('./handelFactory') // impored handel factory

// created delete controller with habdel factory
exports.deleteReview = factory.deleteOne(Review)

// inside rev route 
router.route('/:ID').delete(ReviewController.deleteReview)

