const mongoose=require('mongoose');

const schemaOrder = mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    product_id:mongoose.Schema.Types.ObjectId,
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  const Order = mongoose.model('Order', schemaOrder);
  module.exports=Order;