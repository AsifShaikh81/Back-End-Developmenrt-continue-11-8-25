//* 151. Modelling Tour Guides: Embedding
//*importing 
const userM = require('./userModel');

 //*inside tour model 
  guides: Array

//* creating pre save doc middleware 
tourSchema.pre('save', async function (next) {
  const guidePromises = this.guides.map(async (id) => await userM.findById(id)); // return multiple promises bcz its looping and contain multiple user data

  this.guides = await Promise.all(guidePromises); // catch the all prmise output
  next();
});

//* all explaination in notebook 