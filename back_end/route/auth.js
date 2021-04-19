const router = require('express').Router();
const SuperAdmin = require('../model/superAdmin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation ,loginValidation}= require('../validation');


router.post('/register' , async (req,res) => {

        // validae the data before we a superadmin 
      const {error} = registerValidation(req.body);
      if(error) return res.status(400).send(error.details[0].message);

    // checking if the super dmin is already in database
    const emailExist = await SuperAdmin.findOne({email: req.body.email});
    if (emailExist) return res.status(400).send('Email already Exists');
        
    //Hash the password
    const salt= await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(req.body.password, salt);
   
    //   create new admin
    const superAdmin = new SuperAdmin({
        email : req.body.email,
        password : hashedpassword
    });

    try {
        const saveSuper = await superAdmin.save();
        res.send({superAdmin : superAdmin._id });
    } catch (err) {
        res.status(400).send(err);
    }
});

// login
router.post('/login' , async (req,res) => {
          // validae the data before we a superadmin 
          const {error} = loginValidation(req.body);
          if(error) return res.status(400).send(error.details[0].message);
          
    // checking if the email Exist
    const admin = await SuperAdmin.findOne({email: req.body.email});
    if (!admin) return res.status(400).send('Email is not found ');
    // password is correct
    const validPass = await bcrypt.compare(req.body.password, admin.password);
    if(!validPass) return res.status(400).send('Invalid password ');


    // create and assign a token
    const token = jwt.sign({_id:admin._id}, process.env.TOKEN_SECRET);
    res.header('auth-token' , token).send(token);

});


module.exports = router;