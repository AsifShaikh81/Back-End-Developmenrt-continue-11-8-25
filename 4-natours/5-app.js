//Topic: Handling PATCH Requests

const fs = require('fs');

const express = require('express');
const app = express();

app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

const Readtours = JSON.parse(fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`));

//here not writing entire operation to update and save in data, just writing basic code to patch and to get basic understanding
app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > Readtours.length) {
    return res.status(404).json({
      status: '404 Invalid id',
    });
  }
  res.status(202).json({
    status: 'success',
    message: '<updated>',
  });
});
