// *lect 131 Protecting Tour Routes - Part 1
// creating middlware to protect tour route
exports.protectTourRoute = tryCatchAsync(async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log(token);
  if (!token) {
     return next(new AppError('You are not logged in', 401));
  }
  next()
});

// addd middlware before the route u proteecting
router.route('/').get(authController.protectTourRoute,TourControllersDB.getAllTours).post(TourControllersDB.postTours);
