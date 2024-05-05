const express=require('express');

const router=express.Router();

const {body,validationResult}=require('express-validator');
const { route } = require('./OrderHistory');


const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const signature="MyAimisToProveMyselfToEveryOne";

const userModel=require('../models/User')







//sign up
router.post("/signup",[body('firstName').isLength({min:2}),
body('email').isEmail(),
body('password','Length should be more than 5').isLength({min:5}),
body('addressLine1','Length should be more than 5').isLength({min:5}),
body('addressLine2','Length should be more than 5').isLength({min:5})

], async (req, res) => {
    const salt= await bcrypt.genSalt(10);
      const secPass=await bcrypt.hash(req.body.password,salt);
    console.log(req.body);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
       }
    const { email } = req.body;
  
    userModel.findOne({ email: email }, async (err, result) => {
      console.log(result);
      console.log(err);
      if (result) {
       return res.send({ message: "Email id is already register", alert: false });
      } 
         
        try{

            const newUser=await userModel.create({
    
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                
                email:req.body.email,
                password:secPass,
                confirmPassword:secPass,
                addressLine1:req.body.addressLine1,
                addressLine2:req.body.addressLine2,
                city:req.body.city,
                state:req.body.state,
                pincode:req.body.pincode,
                country:req.body.country,
                image:req.body.image
                
              
              })
    
           await newUser.save();
            console.log('success');
            console.log(secPass);
            res.json({success:true});
          
    
    
    
          }catch(err){
            console.log(err.message);
            res.json({success:false
    
            })
          }
      
    });
  });
  
  //api login
  router.post("/login",[body('email').isEmail(),
  body('password').isLength({min:5})], async (req, res) => {
    // console.log(req.body);
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    let useremail=req.body.email;
    try{
        const userData=await userModel.findOne({email:useremail});
       if(!userData){
        return res.status(400).json({errors:"Try logging with correct credentials"});

    }
      
       let pwdPassword=await bcrypt.compare(req.body.password,userData.password);
       
       if(!pwdPassword){
        console.log(pwdPassword)
        return res.status(400).json({errors:"Try logging with by correct credentials"});


       }
       const data={
        user:{
            id:userData.id
        }
       }
       const authToken=jwt.sign(data,signature);
     return res.json({success:true,"authToken":authToken});
    }catch(err){
        console.log(err);
        res.json({success:false});
    }
  });

  module.exports=router;