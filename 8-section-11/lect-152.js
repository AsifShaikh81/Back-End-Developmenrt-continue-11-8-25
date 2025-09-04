//*lect 152: Modelling Tour Guides: Child Referencing

guides: [
  {
    type: mongoose.Schema.ObjectId,
    ref: 'userModel', /// no need to impport user model direct usser model ka naam diya toh bhi chalgea, ref take responsibilty of connecting
  },
];

//* remeber childe refrencing will only show the user(guide) id in output not entire body ,if u want to see entire body u can use embeding method

//* no need to use pre save doc middleware like one we used in  lect 151

//*ref = refrencing to user model