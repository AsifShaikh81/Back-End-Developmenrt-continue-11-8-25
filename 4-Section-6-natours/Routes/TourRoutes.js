
const express = require('express');

const TourControllers = require('../Controllers/tourControllers'); //importing controllers

const router = express.Router();
      //TourControllers.checkBody is param middleware define befoe creating that is before TourControllers.postTours
router.route('/').get(TourControllers.getAllTours).post(TourControllers.checkBody, TourControllers.postTours);
router                                                 
  .route('/:id')
  .get(TourControllers.getToursById)
  .patch(TourControllers.patchTours)
  .delete(TourControllers.deleteTours);
//router.param('id',TourControllers.checkID) //param middleware
module.exports = router;
