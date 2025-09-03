//*lect 143 :imp rate limiting 

const rateLimit = require('express-rate-limit')

const limiter = rateLimit({
  max: 3,
  windowMs: 60 * 60 * 1000,
  message: 'Too many req from this ip, pls try again in an hour ',
});
app.use('/api', limiter);


/* max : kitna max req bhejna hai 

winfowms =  kitna ghante mein kitna req bhejna hai for ex 1 hr mein 100 re , 30 min mein 100 req aur hum isko miliseconds mein convert kar rahe hai 

message: req exceed hua toh user ko ye message mila ga */