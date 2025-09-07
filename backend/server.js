const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Route files
const auth = require('./routes/auth');
const products = require('./routes/products');
const cart = require('./routes/cart');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// Add this right after: app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: '🛍️ ShopEasy Backend API is running!',
    endpoints: {
      products: '/api/products',
      auth: '/api/auth',
      cart: '/api/cart'
    },
    documentation: 'See GitHub README for details'
  });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shopeasy', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/auth', auth);
app.use('/api/products', products);
app.use('/api/cart', cart);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));