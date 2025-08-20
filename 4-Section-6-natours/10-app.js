//Section 6:Topic:implementing 'users' routes
const express = require('express');
const app = express();

const port = 3000
app.listen(port,()=>{
    console.log(`App running on ${port}`);
    
})

// route handlers
const getAllUsers = (req,res)=>{
    res.status(500).json({
        status:'internal server issue',
        message:'route not defined yet'
    })
}
const getUsers = (req,res)=>{
    res.status(500).json({
        status:'internal server issue',
        message:'route not defined yet'
    })
}
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

//routes
app.route('/api/v1/users').get(getAllUsers).post(postUsers);
app.route('/api/v1/users/:id').get(getUsers).patch(patchUsers).delete(deleteUsers);