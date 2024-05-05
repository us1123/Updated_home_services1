
const express=require('express');

const router=express.Router();
const Order=require('../models/Order');

// Route to create a new order
router.post('/orders', async (req, res) => {
    try {
      const { user_id, product_id } = req.body;
  
      // Create a new order instance
      const newOrder = new Order({
        user_id,
        product_id
      });
  
      // Save the order to the database
      const savedOrder = await newOrder.save();
  
      // Send back the saved order as a response
      res.status(201).json(savedOrder);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Route to get orders by user ID
  router.get('/orders/user/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Find all orders for the specified user ID
      const orders = await Order.find({ user_id: userId });
  
      // Send the orders back as a response
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  module.exports=router;