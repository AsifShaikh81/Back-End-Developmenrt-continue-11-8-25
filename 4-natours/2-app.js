//Topcic: Starting Our API: Handling GET Requests
const fs = require('fs');

const express = require('express');
const app = express();

const Readtours = JSON.parse(fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`)); //reading file and // converting json string to js object

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    //Formating json to jsend before sending data to client
    //key:  value
    status: 'success',
    results: Readtours.length,
    data: {
      tours: Readtours,
    },
  });
});
