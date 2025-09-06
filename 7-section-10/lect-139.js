// 139. Updating the Current User: Data
//*hum ek route bana rahe hai sirf user ke liye aur woh route mein user sirf email aur name update kar sakta hai usse zada nahi ,role,password nahi update kar sakta hai 

router.route('/updateme').patch(authController.protectTourRoute, updateMe) 


exports.updateMe = tryCatchAsync(async (req,res,next) => {
  if(req.body.password||req.body.passwordConfirm ){
    return next(new AppError('this route is not for user',400))
  }

  const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el]= obj[el]
    
  });
  return newObj
}
//*2) Filtered out unwanted fields names that are not allowed to be update
const filterBody = filterObj(req.body,'name','email')

  //*3) update user document
  const updateUser = await userM.findByIdAndUpdate(req.body,filterBody,{new:true,runValidators:true})
  res.status(200).json({
    status:'success',   
    data:{
      updateUser
    }
  });
})

// explaination: 

/*object.keys(obj)= looping through object 'obj', this 'obj' object created by us.
filterobj function is created to allow only selected field = name, email

if(allowedFields.includes(el))  => check kar raha hai allowed fields ke andar humne jo el dala hai woh hai ki nahi 
newObj[el] = obj[el] agar hai toh newObj ke andar wo elements dal do joh 'obj' ke andar hai aur fir return kardo 'newObj' ko  */

//* remember 
/* Normal updateUser / deleteUser admin ke liye hote hain (jo kisi bhi user ko update/delete kar sake).

Lekin updateMe aur deleteMe ka focus sirf currently logged-in user pe hota hai. */