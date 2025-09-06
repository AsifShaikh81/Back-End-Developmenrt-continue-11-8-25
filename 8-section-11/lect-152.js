//*lect 152: Modelling Tour Guides: Child Referencing

guides: [
  {
    type: mongoose.Schema.ObjectId, //stores the _id of a 'userModel'
    ref: 'userModel', /// no need to impport user model direct usser model ka naam diya toh bhi chalgea, ref take responsibilty of connecting 'userModel
  },
];

//* remeber childe refrencing will only show the user(guide) id in output not entire body ,if u want to see entire body u can use embeding method

//* no need to use pre save doc middleware like one we used in  lect 151

//*ref = refrencing to user model

// ref:refering to the model (connecting )
// mongoose.Schema.ObjectId, ---> it will get the id of the refering model , in this case we ref 'userModel' so it will get userModel id
