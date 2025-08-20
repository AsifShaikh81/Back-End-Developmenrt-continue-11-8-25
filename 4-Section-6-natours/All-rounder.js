//finale code before "better-file-structure.js"
const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.json());
const Readtours = JSON.parse(fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`));

const port = 3000;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});

// route handlers
//Tours
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: Readtours.length,
    data: {
      tours: Readtours,
    },
  });
};
const getToursById = (req, res) => {
  const id = req.params.id * 1;
  const x = Readtours.find((el) => el.id === id);

  if (!x) {
    return res.status(404).json({
      status: 'failed',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      x,
    },
  });
};

const postTours = (req, res) => {
  const newId = Readtours[Readtours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  Readtours.push(newTour);

  fs.writeFile(`${__dirname}/starter/dev-data/data/tours-simple.json`, JSON.stringify(Readtours), (err) => {
    //201 code means created
    res.status(201).json({
      status: 'created-successfuly',
      data: {
        Readtours: newTour,
      },
    });
  });
};

const patchTours = (req, res) => {
  if (req.params.id * 1 > Readtours.length) {
    return res.status(404).json({
      status: '404 Invalid id',
    });
  }
  res.status(202).json({
    status: 'success',
    message: '<patch>',
  });
};
const deleteTours = (req, res) => {
  if (req.params.id * 1 > Readtours.length) {
    return res.status(204).json({
      status: 'No Content',
    });
  }
  res.status(204).json({
    status: 'success',
    message: '<delete>',
  });
};

// ---------------users-------------------------
const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'internal server issue',
    message: 'route not defined yet',
  });
};
const getUsers = (req, res) => {
  res.status(500).json({
    status: 'internal server issue',
    message: 'route not defined yet',
  });
};
const postUsers = (req, res) => {
  res.status(500).json({
    status: 'internal server issue',
    message: 'route not defined yet',
  });
};
const patchUsers = (req, res) => {
  res.status(500).json({
    status: 'internal server issue',
    message: 'route not defined yet',
  });
};
const deleteUsers = (req, res) => {
  res.status(500).json({
    status: 'internal server issue',
    message: 'route not defined yet',
  });
};
// route handlers

const UsersRoute = express.Router();
const ToursRoute = express.Router();

app.use('/api/v1/users', UsersRoute);
app.use('/api/v1/tours', ToursRoute);
UsersRoute.route('/').get(getAllUsers).post(postUsers);
UsersRoute.route('/:id').get(getUsers).patch(patchUsers).delete(deleteUsers);

ToursRoute.route('/').get(getAllTours).post(postTours);
ToursRoute.route('/:id').get(getToursById).patch(patchTours).delete(deleteTours);

//routes
