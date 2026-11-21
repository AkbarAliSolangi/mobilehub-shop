const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const mongoose = require('mongoose');

// Create new order
router.post('/', async (req, res) => {
  try {
    const { userId, products, shippingAddress, paymentMethod } = req.body;

    // Validate products array
    if (!products || products.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Calculate total and check stock
    let totalAmount = 0;
    const orderProducts = [];

    for (let item of products) {
      const product = await Product.findById(item.productId);
      
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.productId}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Insufficient stock for ${product.name}. Available: ${product.stock}` 
        });
      }

      totalAmount += product.price * item.quantity;
      
      orderProducts.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });

      // Reduce stock
      product.stock -= item.quantity;
      await product.save();
    }

    // Free delivery for orders above Rs. 10,000
    const deliveryCharges = totalAmount > 10000 ? 0 : 200;

    // Create order (without userId validation for now)
    const order = new Order({
      user: new mongoose.Types.ObjectId(), // Temporary ObjectId
      products: orderProducts,
      totalAmount,
      deliveryCharges,
      paymentMethod,
      shippingAddress
    });

    await order.save();

    res.status(201).json({
      message: 'Order placed successfully',
      order
    });
  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: error.message });
  }
});

// Get all orders (for testing)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('products.product', 'name image price')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('products.product', 'name image price');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Request return
router.post('/:id/return', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.returnRequest.requested = true;
    order.returnRequest.reason = req.body.reason;
    order.orderStatus = 'Returned';

    await order.save();

    res.json({ message: 'Return request submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;