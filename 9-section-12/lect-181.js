//181. Setting up the Project Structure

//in this lecture we seperated view in viewController and viewRoute 

1.//inside view controller 
// we render neccessary template 
exports.getOverview = (req, res) => {
  res.status(200).render('overviewTemp', {
    tour: 'the forest hiker',
    user: 'Asif',
  });
};

exports.getTour =  (req, res) => {
  res.status(200).render('tourTemp', {
    title: 'the forest hiker',
  });
}

2.// inside view route
// inside this we define route for each file 
const express = require('express');
const router = express.Router();
const viewController = require('./../Controllers/viewController');

//*lect -180
router.get('/', viewController.getOverview);

router.get('/tour', viewController.getTour);
//*lect -180

module.exports = router;

3.// inside server file better file structure js
const viewRoute = require('./Routes/viewRoute') //lect-181 , imported route

app.use('/',viewRoute) // lect -181 // global route for view 