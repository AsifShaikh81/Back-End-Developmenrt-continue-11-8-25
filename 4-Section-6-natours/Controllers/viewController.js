const Tour = require('./../models/tourModel');
const User = require('./../models/userModel')
const tryCatchAsync = require('./../utils/try-catch-error-handler');
const AppError = require('../utils/appError')

exports.getOverview = tryCatchAsync(async (req, res) => {
  // 1) Get tour data from collection
  const tours = await Tour.find();
  res.status(200).render('overviewTemp', {
    title: 'All Tours',
    // user: res.locals.user || req.user || null,
    // user: res.locals.user || req.user ,
    tours, // all the tour data from collection pass to template
  });
});

exports.getTour = tryCatchAsync(async (req, res,next) => {
  /*In Mongoose, when you use .populate(), you’re telling MongoDB:
“Along with this document, also fetch related documents from another collection.” */
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews', //Tells Mongoose: “use the virtual field reviews defined in the tour model schema and populate it with documents from the Review model.”
    fields: 'review rating user', //Means: only include these properties(review, rating, user) from the Review documents when populating.
    });

     if (!tour) {
    return next(new AppError('There is no tour with that name.', 404));
  }

  res.status(200).render('tourTemp', {
    title: `${tour.name} Tour `,
    // user: res.locals.user || req.user , 
    tour, // passing data, it contains tour model collection
  });
});
exports.getSignUp = (req,res)=>{
  res.status(200).render('signUp',{
    title:'sign up'
  })
}
exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
    
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
    user: res.locals.user || req.user 
  });
};

exports.updateUserData = tryCatchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});

