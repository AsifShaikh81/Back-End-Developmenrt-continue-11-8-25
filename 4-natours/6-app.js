//Topic: Handling DELETERequests

const fs = require('fs');

const express = require('express');
const app = express();

app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

const Readtours = JSON.parse(fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`));

//here not writing entire operation to delete and save in data, just writing basic code to delete for understanding
app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > Readtours.length) {
    return res.status(204).json({
      status: 'No Content',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
});
