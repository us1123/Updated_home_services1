
const mongoose=require('mongoose');


const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: {
      type: String,
      unique: true,
    },
    password: String,
    confirmPassword: String,
    image: String,
    addressLine1: String,
    addressLine2: String, 
    city: String, 
    pincode: String, 
    state: String,  
    country: String, 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
   
  });
  
  //
  const userModel = mongoose.model("user", userSchema);

  module.exports=userModel;