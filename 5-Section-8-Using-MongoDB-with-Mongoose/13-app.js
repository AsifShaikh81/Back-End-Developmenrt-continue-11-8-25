//Topic:104. Virtual Properties

/* 🔹What are Virtual Properties?
•Virtual properties are extra fields in Mongoose that don’t get saved in the database but are calculated when you fetch the data.
•They are like "fake fields" you can use in your app but MongoDB will never store them. */

/* 🔹Why do we need them?
•To avoid storing unnecessary data in MongoDB.
•To calculate values on the fly when you query data.
•To make your models cleaner and smarter. */

/* 🔹In short:
•Virtual Property = extra field (not saved in DB)
•It is calculated dynamically when you fetch documents. */

const schema1 = new moongoose.Schema(
  {
    duration: Number, // field we are using 
  },
  {
    // When a document is converted to JSON (for example when sending as API response),
    // include the virtual properties as well.
    toJSON: { virtuals: true },

    // When a document is converted to a plain JavaScript object
    // also include the virtual properties.
    toObject: { virtuals: true },
  },
);
tourSchema.virtual('durationweek').get(function () {
  return this.duration / 7;
});

// note
/* this.duration / 7;
7 days /   7

always use regular funtion no arrow func kyu 'this' use karna hai aur 'this' arrow func mein work nahi karta 

durationweek : this is a virtual field we are creating

*/


