// 134. Authorization: User Roles and Permissions
// 1)
/*  .delete(authController.protectTourRoute,authController.restrictTo('admin','lead-guide'),TourControllersDB.deleteTours);
 */

// 2)
/* exports.restrictTo = (...roles)=>{
  return (req,res,next) =>{
    if(!roles.includes(req.user.role)){
      return next(new AppError('u dont have permisiion',403))
    }
    next()
  }
} */

// 3)
/* role:{
    type:String,
    enum:['admin','user','guid','lead-guide'],
    default:'user'
  }, */

  // req.user.role ==> iske andar {name,role etc hai} hai jo humne auth controller mein create kiya as a 'protectTourRoute '

  //*explaination in chat gpt : https://chatgpt.com/c/68b5914d-2868-832f-84d7-add072fe36b5