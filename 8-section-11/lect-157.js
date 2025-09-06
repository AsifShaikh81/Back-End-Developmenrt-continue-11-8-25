// lect:157 Virtual Populate: Tours and Reviews

//explaination:https://chatgpt.com/c/68bab847-df10-832b-8923-88dedd5a7bf1

 const DATA = await Tour.findById(req.params.ID).populate('reviews')


 tourSchema.virtual('reviews',{
  ref:'Review', // referencing to review model
  foreignField:'tour', //for connecting review and tour model, this tour fiels inside review model 
  localField:'_id' // '_id' is a primary key of tour document ,  Tour model ka "_id" field
})


// https://chatgpt.com/c/68bb2cf3-e9fc-8332-979b-64ca73220cef