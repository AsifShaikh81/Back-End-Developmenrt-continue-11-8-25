
const express = require('express');

const TourControllersDB = require('../Controllers/tourControllers-DB.js'); //importing controllers- databse

const router = express.Router();
      //TourControllers.checkBody is param middleware define befoe creating that is before TourControllers.postTours

router.route('/top-5-cheap').get(TourControllersDB.aliasTopTours, TourControllersDB.getAllTours)
router.route('/').get(TourControllersDB.getAllTours).post(TourControllersDB.postTours);
router                                                 
  .route('/:ID')
  .get(TourControllersDB.getToursById)
  .patch(TourControllersDB.updateTours)
  .delete(TourControllersDB.deleteTours);
//router.param('id',TourControllers.checkID) //param middleware
module.exports = router;
