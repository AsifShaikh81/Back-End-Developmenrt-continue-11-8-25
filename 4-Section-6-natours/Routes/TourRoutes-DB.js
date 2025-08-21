
const express = require('express');

const TourControllersDB = require('../Controllers/tourControllers-DB'); //importing controllers- databse

const router = express.Router();
      //TourControllers.checkBody is param middleware define befoe creating that is before TourControllers.postTours
router.route('/').get(TourControllersDB.getAllTours).post(TourControllersDB.postTours);
router                                                 
  .route('/:ID')
  .get(TourControllersDB.getToursById)
  .patch(TourControllersDB.updateTours)
  .delete(TourControllersDB.deleteTours);
//router.param('id',TourControllers.checkID) //param middleware
module.exports = router;
