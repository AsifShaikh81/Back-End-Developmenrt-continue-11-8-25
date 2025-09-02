
// 126. Creating New Users
const userM = require("../models/userModel")
const tryCatchAsync = require('./../utils/try-catch-error-handler');


exports.signUp =  tryCatchAsync(async (req,res) => {
    // const user =  await userM.create(req.body) //*replaced with below code this not correct ,check lect 126
    const user =  await userM.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.confirm
    })

    res.status(201).json({
        status: 'success',
        data: user
    })
})