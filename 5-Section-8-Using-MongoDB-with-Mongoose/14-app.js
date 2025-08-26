// topic:105 Document Middleware

const { default: slugify } = require("slugify")

// 📌 Document Middleware in Mongoose

/*🔹 what is document middleware?
•Document middleware are functions that run before or after certain actions happen to a document (like saving or deleting it). */

//🔹Explanation in Simple Words:
/* •pre('save') → Runs before saving the document.
Example:hash a password before saving. 

•post('save') → Runs after saving the document.
Example: You can send a welcome email after a user is saved.

Works only with document methods like:
.save()
.create()
.remove()

*/

// what we doing in code?
//before saving we will slugify the name and after saving u can check document for result  

// Pre middleware (runs BEFORE the document is saved in DB)
tourSchema.pre('save', function (next) {
    // 'this' points to the current document
    this.slug = slugify(this.name,{lower:true})
    next() // move to the next middleware
})

// Post middleware (runs AFTER the document is saved in DB)
tourSchema.post('save',function (doc,next) {
     // 'doc' is the saved document
    console.log(doc);
    next();
    
    
})

/* 🔑 Key Points:
pre('save') → runs before saving.
post('save') → runs after saving.
this → refers to the document in pre middleware.
doc → refers to the saved document in post middleware.
next() → must be called to continue execution. */