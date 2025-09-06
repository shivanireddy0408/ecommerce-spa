const express = require('express');
const router = express.Router();

// Mock cart data (in real app, this would be a database)
let carts = [];

// Get user's cart
router.get('/', (req, res) => {
  try {
    // In a real app, we would get user ID from JWT token
    const userId = req.header('UserId') || 'default-user';
    
    let cart = carts.find(cart => cart.userId === userId);
    
    if (!cart) {
      cart = { userId, items: [] };
      carts.push(cart);
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add to cart
router.post('/', (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.header('UserId') || 'default-user';
    
    let cart = carts.find(cart => cart.userId === userId);
    
    if (!cart) {
      cart = { userId, items: [] };
      carts.push(cart);
    }
    
    // Check if product already in cart
    const existingItem = cart.items.find(item => item.productId == productId);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }
    
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;