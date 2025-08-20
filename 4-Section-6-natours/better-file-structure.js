//TopicBette structure
//*config.env
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
// console.log(process.env);

const express = require('express');
const morgan = require('morgan');

const mongoose = require('mongoose'); // require mongoose pkc

const DB = process.env.D_STRING.replace('<PASSWORD>',process.env.D_PASSWORD)

 // connnecting database
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex:true,
  useFindAndModify:false
  
}).then(()=> console.log('database connected')
)// using then bcz its return promise

const app = express();
//*config.env
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log('Morgan enabled in development mode 🚀');
}
app.use(express.json());
//static files
app.use(express.static(`${__dirname}/starter/public`));

//*config.env
const port = process.env.PORT || 3000; //process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});

//routes
const ToursRoute = require('./Routes/TourRoutes'); //importing tour route module
const UsersRoute = require('./Routes/UserRoutes'); // importing user route router

app.use('/api/v1/users', UsersRoute);
app.use('/api/v1/tours', ToursRoute);

// module.exports = app // here exporting  'const app = express();'

