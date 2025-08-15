//Bette structure
const express = require('express');

const app = express();
app.use(express.json());



const port = 3000;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});

// route handlers
//Tours

// ---------------users-------------------------

// route handlers

const ToursRoute = require('./Routes/TourRoutes') //importing tour route module
const UsersRoute = require('./Routes/UserRoutes') // importing user route router
app.use('/api/v1/users', UsersRoute);
app.use('/api/v1/tours', ToursRoute);


//routes
