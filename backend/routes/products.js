const express = require('express');
const router = express.Router();

// Mock product data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    category: "electronics",
    image: "https://via.placeholder.com/300x300?text=Headphones"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    category: "electronics",
    image: "https://via.placeholder.com/300x300?text=Smart+Watch"
  },
  {
    id: 3,
    name: "Cotton T-Shirt",
    price: 24.99,
    category: "clothing",
    image: "https://via.placeholder.com/300x300?text=T-Shirt"
  },
  {
    id: 4,
    name: "JavaScript Programming Book",
    price: 39.99,
    category: "books",
    image: "https://via.placeholder.com/300x300?text=JS+Book"
  }
];

// Get all products with filtering
router.get('/', (req, res) => {
  try {
    const { category, maxPrice, sortBy } = req.query;
    
    let filteredProducts = [...products];
    
    // Filter by category
    if (category) {
      filteredProducts = filteredProducts.filter(product => 
        product.category === category
      );
    }
    
    // Filter by max price
    if (maxPrice) {
      filteredProducts = filteredProducts.filter(product => 
        product.price <= Number(maxPrice)
      );
    }
    
    // Sort products
    if (sortBy === 'price-low') {
      filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filteredProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'name') {
      filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    res.json(filteredProducts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;