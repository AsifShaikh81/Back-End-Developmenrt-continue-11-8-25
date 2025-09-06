
// lect 164:Adding a /me Endpoint

// explaination in notebook 
// inside user controller
exports.getMe =  async(req,res,next) =>{
req.params.ID = req.user.id
next()
}


// inside user route
router.route('/me').get(authController.protectTourRoute,getMe,getUsers) // lect 164