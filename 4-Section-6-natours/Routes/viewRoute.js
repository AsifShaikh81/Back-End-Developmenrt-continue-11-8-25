const express = require('express');
const router = express.Router();
const viewController = require('./../Controllers/viewController');

//*lect -180
router.get('/', viewController.getOverview);

router.get('/tour', viewController.getTour);
//*lect -180

module.exports = router;
