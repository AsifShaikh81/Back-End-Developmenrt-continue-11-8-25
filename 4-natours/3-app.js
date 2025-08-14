//topic: Handling POST Requests
const fs = require('fs');

const express = require('express');
const app = express();

app.use(express.json()); //using middleware for "req.body"
//middleware => middleware modifies incoming request

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

const Readtours = JSON.parse(fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`)); //reading file and // converting json string to js object

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

//-----------main focus in this lecture is post method-------------------
app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);  here i able to access data bcz of middleware, comment middleware to see changes
  //we cannot get data directly from req obj bcz express does not put data in to req object so we use middleware
  const newId = Readtours[Readtours.length - 1].id + 1; //here we creating id
  const newTour = Object.assign({ id: newId }, req.body); // here merging new object to existing object
  //Object.assign() => allows to create new object by merging existing object

  Readtours.push(newTour); // push newly created object
                //here👇over writing existing file to save new data     //here👇converting array to string
  fs.writeFile(`${__dirname}/starter/dev-data/data/tours-simple.json`, JSON.stringify(Readtours), (err) => {
    //201 code means created
    res.status(201).json({
      status: 'created-successfuly',
      data: {
        Readtours: newTour,
      },
    });
  });
});
