//Topic :Responding to URL Parameters
const fs = require('fs');

const express = require('express');
const app = express();

app.use(express.json());

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

// here id is variable/param =>'./api/v1/tours/:id' ==>EX:'./api/v1/tours/1'
//U can define multiple variabel/para => './api/v1/tours/:id/:x/:y' ==> EX:'./api/v1/tours/1/2/3'
// Optional variable/param => './api/v1/tours/:id/:x/:y? ==> EX:'./api/v1/tours/1/55'
// here y? => is optinal isko define kar bhi sakte hoo nahi bhi kar sakte hoo its depends on u

const Readtours = JSON.parse(fs.readFileSync(`${__dirname}/starter/dev-data/data/tours-simple.json`));
app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1; // converting string to num. when we multiplt string with num it will automatically convert string to num
  // el.id === id ==> 1 === 1
  const x = Readtours.find((el) => el.id === id);
  // JavaScript me find() ek array method hai jo array ke elements ko sequence me check karta hai aur jo pehla element tumhari condition ko satisfy karta hai, usko return karta hai; agar koi element condition pass nahi karta, to undefined return hota hai, aur ye original array ko change nahi karta.

  //if id does exist it will return 404 failed
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
});
