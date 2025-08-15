//Topic:Creating and Mounting Multiple Routers
const express = require('express');
const app = express();


const port = 3000
app.listen(port,()=>{
    console.log(`App running on ${port}`);
    
})

// route handlers
//users
const getAllUsers = (req,res)=>{
    res.status(500).json({
        status:'internal server issue',
        message:'route not defined yet'
    })
}
// const getUsers = (req,res)=>{
//     res.status(500).json({
//         status:'internal server issue',
//         message:'route not defined yet'
//     })
// }
const postUsers = (req,res)=>{
    res.status(500).json({
        status:'internal server issue',
        message:'route not defined yet'
    })
}
const patchUsers = (req,res)=>{
    res.status(500).json({
        status:'internal server issue',
        message:'route not defined yet'
    })
}
const deleteUsers = (req,res)=>{
    res.status(500).json({
        status:'internal server issue',
        message:'route not defined yet'
    })
}

// ---------------Tours-------------------------
const getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: '<get>',
  });
};

const postTours = (req, res) => {
  res.status(201).json({
    status: 'created',
    message:'<post>'
  });
};

const patchTours = (req, res) => {
  res.status(202).json({
    status: 'success',
    message: '<patch>',
  });
};
const deleteTours = (req, res) => {
  res.status(204).json({
    status: 'success',
    message: '<delete>',
  });
};
// route handlers

// ============main focus in this lecture is express.Router()============
// Express.js me express.route() ek tarika hai jisme aap same path ke liye multiple HTTP methods (GET, POST, PUT, DELETE, etc.) ek hi jagah chain karke likh sakte ho
//routes
const UsersRoute = express.Router();
const ToursRoute = express.Router()

app.use('/api/v1/users', UsersRoute) // root path for users
app.use('/api/v1/tours', ToursRoute) // root path for tours
UsersRoute.route('/').get(getAllUsers).post(postUsers); // ye pe sirf '/' define kiya hai kyu ki app.use mein already root path declare kardiya hai aur ye sab express.router ki wajeh se hoo paya hai 
UsersRoute.route('/:id').patch(patchUsers).delete(deleteUsers); // '/:id' => '/api/v1/tours'/:id

ToursRoute.route('/').get(getTours).post(postTours) // '/' => '/api/v1/users'
ToursRoute.route('/:id').put(patchTours).delete(deleteTours)  //'/:id' => '/api/v1/users'/:id'


//routes