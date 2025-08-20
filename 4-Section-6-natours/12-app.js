//Section 6:Topic:1)param middleware 
// 2)chaining Multiple Middleware Functions
// 3) serving static files => how to use static files(hmtl,css file and images)
const fs = require('fs');

const express = require('express');
const app = express();
app.use(express.json());

const morgan = require('morgan');
app.use(morgan('dev'));

//3rd topic
//static files should always be inside public folder 
// hit this url to see static file "127.0.0.1:5000/overview.html"
app.use(express.static(`${__dirname}/starter/public`)) // for static files

app.listen(5000, () => {
  console.log('app running on port:5000');
});

const readFile = JSON.parse(fs.readFileSync(`${__dirname}/dummy.json`, 'utf-8'));

//?1)param middleware kya hota hai? ==> 1st topic
//*Jab tum apne URL me koi parameter (jaise :id, :userId, :postId) use karte ho, to tum us parameter ke liye middleware logic likh sakte ho aur woh logic sirf uss param ke liye kam karega.
//*Isse fayda ye hota hai ki har route jisme wo param use ho raha hai, uske liye ek hi jagah pe logic run kar sakte ho baar baar logic ko haar jagah repeat karne ki zarurat nahi

//!param middleware start

//*ye ek simple custom middleware hai,isme 4th argunment 'val pass kar rahe hai toh ye param middleware ban gaya, iske andar jo bhi logic ddefine karna hai define kar sakte hai
//* Jab bhi koi :id param route hit hoga, ye middleware chalega
//*jab param middleware use kar rahe hoo tab 'value' object dena zaruri hai kyu ki useme param ki value store hogi
const fetchUserById = (req, res, next, val) => {
  const id = val * 1;
  // check if tour with this id exists
  const x = readFile.find((el) => el.id === id);
  if (!x) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  //  'saveData' custome property created buy us to save incoming data from 'x'
  req.saveData = x;
  // move to next middleware/controller
  next();
};
const checkId = (req, res, next, val) => {
  if (isNaN(val)) {
    return res.status(400).json({ status: 'fail', message: 'ID must be a number' });
  }
  next();
};
//!param middleware end

// handlers/controllers
const getAllUser = (req, res) => {
  res.status(202).json({
    status: 'success',
    message: 'got all users',
    data: readFile,
  });
};
const getUserById = (req, res) => {
  res.status(202).json({
    status: 'success',
    message: 'got user by id',
    data: req.saveData,
  });
};

//routes
const UserRouter = express.Router();
app.use('/users', UserRouter); //root patch

UserRouter.route('/').get(getAllUser);
UserRouter.route('/:id').get(getUserById);

//using param middleware
// can use muliple middleware for single param
// here chaining middleware ==> 2nd topic
//!note :param middleware ka order important hota hai.
UserRouter.param('id', checkId);// pehle validation
UserRouter.param('id', fetchUserById);  // fir fetch logic
