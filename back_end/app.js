const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//import route
const authRoute = require('./route/auth');
const postRoute = require('./route/posts');

dotenv.config();


// connect database
mongoose.connect(
    "mongodb://localhost:27017/Market" ,
    {useNewUrlParser: true, useUnifiedTopology: true} ,
    (err) => {
        if(!err) 
            console.log("Mongodb connected");
        else 
            console.log("Connection error :" +err);
    }
);
// midlwres
app.use(express.json());


//route midlwres
app.use('/api/SuperAdmin' , authRoute)
app.use('/api/posts' , postRoute );

// const jwt = require('jsonwebtoken');


// app.get('/api' , (req,res) => {
//     res.json({
//         message : 'welcome to you saloua'
//     });
// });


// app.post('/api/posts' , verifyToken, (req,res) => {
//     jwt.verify(req.token, 'secretkey' , (err, authData) => {
//         if(err){
//             res.sendStatus(403);
//         }
//         else{
//             res.json({
//                 message : 'post creadted...' ,
//                 authData
//             });
//         } 
//     });
  
// });

// app.post('/api/login' , (req,res) => {
//     const user = {
//         id: 1,
//         email: 'saloua@gmail.com'
//     }
//     jwt.sign({user}, 'secretkey' , (err,token) => {
//         res.json({
//           token
//         });
//     });
// });
// //format of token 
// //authorization : bearer <access_token> 

// //verify token 
// function verifyToken(req,res, next) {
//     //get auth header value
//     const bearerheader = req.headers['authorization'];
//     //check if bearer is undefined

//     if(typeof bearerheader !== 'undefined'){
//         //split at the space
//         const bearer = bearerheader.split('  ');
//         //get token from array
//         const bearerToken = bearer[1];
//         //set the token 
//         req.token= bearerToken;
//         //next middleware
//         next();
//     }
//     else{
//         //forbidd
//         res.sendStatus(403);
//     }
// }

app.listen(5000 , () => console.log('Server started on port 5000'));