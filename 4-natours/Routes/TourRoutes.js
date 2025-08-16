
const express = require('express');

const TourControllers = require('../Controllers/tourControllers'); //importing controllers

const router = express.Router();

router.route('/').get(TourControllers.getAllTours).post(TourControllers.postTours);
router
  .route('/:id')
  .get(TourControllers.getToursById)
  .patch(TourControllers.patchTours)
  .delete(TourControllers.deleteTours);

module.exports = router;
