// lect 145 : data sanitization 

// *1) to preven no sql attack
//npm i express-mongo-sanitize // to install
const mongoSanitize = require('express-mongo-sanitize'); //  to import
app.use(mongoSanitize()); // to use

// *1) to preven cross site scritpting attack (depricated)
//npm xss-clean // to install
const xss = require('xss-clean');  //  to import
app.use(xss()) // to use