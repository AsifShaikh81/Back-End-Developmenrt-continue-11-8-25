// Topic: setting up Express and Basic Routing

//creating server
const express = require('express');
const app = express();

const port = 3000;
app.listen(port, () => {
  console.log(`app running on port ${port}`);
});

//basic routing
// app.get("/", (req, res) => {
//   res.send("welcome");
// });

//status==> for defining status like 505,202,404
// app.get("/", (req, res) => {
//   res.status(404).send("welcome");
// });

//json ==> output will be in json/object fromat check on postman,json work like 'content-type':'application/json' we did this in nodeJs
app.get('/', (req, res) => {
  res.status(200).json({ message: 'welcome', Author: 'Asif Shaikh' });
});

//post req
app.post('/', (req, res) => {
  res.status(200).json({ message: 'welcome', Author: 'Asif Shaikh', request: 'post-request' });
});
