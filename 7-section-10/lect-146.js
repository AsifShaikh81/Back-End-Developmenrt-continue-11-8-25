// lect 146:prevent parameter pollution 
//*npm i hpp // install

//*cont hpp = require('hpp') //import

app.use(hpp()) // use 

// whitelist 
app.use(hpp({
    whitelist:['duration']
}))

// all explaination in notebook 