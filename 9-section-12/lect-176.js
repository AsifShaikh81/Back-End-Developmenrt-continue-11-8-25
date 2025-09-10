//176: Setting up Pug in Express

const path = require('path'); // for path join
// -----main------
// npm i pug

app.set('view engine', 'pug'); // init pug
app.set('views', path.join(__dirname, 'views')); // setiing folder location , 'views'=> folder name jaha pe pug file hai

// created views folder inside that folder created base.pug File
//insie base.pug file
// h1 the park camper
// upar jo code hai uska mtlb <h1>the park camper</h1>


//created route to render base.pug file
//pug route lect -176
app.get('/', (req, res) => {
  res.status(200).render('base');
});

// base=> file name
