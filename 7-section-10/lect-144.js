// lect 144:setting Security HTTP Headers

//* 5)helmet middleware  // lect 144
//*to install
//  npm i helmet
//*to import
const helmet = require('helmet');
//*to use
app.use(helmet());

//  ------------in this lecture we alson learn ----------------
app.use(express.json({ limit: '10kb' })); //*body will recive 10 kb data ,more than that 10kb it will note recive kb =kilobyte/kilobite
