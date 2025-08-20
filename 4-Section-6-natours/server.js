const app = require('../Server/app') // here importing  'const app = express();'

const port = 3000;
app.listen(port, () => {
  console.log(`App running on ${port}`);
});
//not using this file 