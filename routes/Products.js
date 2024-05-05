const express=require('express');

const router=express.Router();
const productModel=require('../models/Product');

//save product in data 
//api
router.post("/uploadProduct",async(req,res)=>{
    // console.log(req.body)
    const data = await productModel(req.body)
    const datasave = await data.save()
    res.send({message : "Upload successfully"})
})

//
router.get('/product', async (req, res) => {
  try {
    const data = await productModel.find({});
    res.json(data); // Send JSON response directly
  } catch (error) {
    console.error('Error fetching product data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }

});

module.exports=router;