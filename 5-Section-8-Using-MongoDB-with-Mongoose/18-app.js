//Topic: 109. Data Validation: Custom Validators

//external validator 
/* const validator = require('validator'); // import
 validate: [validator.isAlpha,'name must be a alpha '] external validator */

/* // own custom validator 
priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
         Only works when creating NEW doc (not on update)
         return  val < this.price;
        },
        message: `Dicscount price ({VALUE}) must be below regular price `,
      },
    }, */

    //all explaination for this topic is in notebook