// Sample product data
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
    },
    {
        id: 5,
        name: "Coffee Maker",
        price: 79.99,
        category: "home",
        image: "https://via.placeholder.com/300x300?text=Coffee+Maker"
    },
    {
        id: 6,
        name: "Bluetooth Speaker",
        price: 59.99,
        category: "electronics",
        image: "https://via.placeholder.com/300x300?text=Speaker"
    },
    {
        id: 7,
        name: "Winter Jacket",
        price: 129.99,
        category: "clothing",
        image: "https://via.placeholder.com/300x300?text=Jacket"
    },
    {
        id: 8,
        name: "Python Programming Book",
        price: 44.99,
        category: "books",
        image: "https://via.placeholder.com/300x300?text=Python+Book"
    }
];

// DOM Elements
const loginSection = document.getElementById('login-section');
const signupSection = document.getElementById('signup-section');
const productsSection = document.getElementById('products-section');
const cartSection = document.getElementById('cart-section');
const productsGrid = document.getElementById('products-grid');
const cartItems = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartItemsCount = document.getElementById('cart-items-count');
const cartSubtotal = document.getElementById('cart-subtotal');
const cartTotal = document.getElementById('cart-total');
const priceFilter = document.getElementById('price-filter');
const priceValue = document.getElementById('price-value');
const categoryFilter = document.getElementById('category-filter');
const sortBy = document.getElementById('sort-by');

// Navigation Elements
const navLogin = document.getElementById('nav-login');
const navLogout = document.getElementById('nav-logout');
const navProducts = document.getElementById('nav-products');
const navCart = document.getElementById('nav-cart');
const switchToSignup = document.getElementById('switch-to-signup');
const switchToLogin = document.getElementById('switch-to-login');
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');

// Cart state
let cart = JSON.parse(localStorage.getItem('cart')) || [];
// API base URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
// Initialize the app
function initApp() {
    renderProducts();
    updateCartUI();
    
    // Check if user is logged in (simulated)
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
        showProductsPage();
    } else {
        showLoginPage();
    }
}

// Render products to the grid
function renderProducts() {
    const category = categoryFilter.value;
    const maxPrice = parseInt(priceFilter.value);
    const sortOption = sortBy.value;
    
    let filteredProducts = products.filter(product => {
        return (category === '' || product.category === category) && 
               product.price <= maxPrice;
    });
    
    // Sort products
    if (sortOption === 'name') {
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price);
    }
    
    productsGrid.innerHTML = '';
    
    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product-card';
        productElement.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <div class="product-actions">
                    <button class="btn btn-accent add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        `;
        productsGrid.appendChild(productElement);
    });
    
    // Add event listeners to Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartUI();
    
    // Show notification
    alert(`${product.name} added to cart!`);
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    renderCartItems();
}

// Update cart quantity
function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
            renderCartItems();
        }
    }
}

// Render cart items
function renderCartItems() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="text-center mt-2">Your cart is empty</p>';
        return;
    }
    
    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';
        cartItemElement.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            <div class="cart-item-info">
                <h3 class="cart-item-title">${item.name}</h3>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span class="quantity-value">${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                    </div>
                    <button class="remove-btn" data-id="${item.id}">Remove</button>
                </div>
            </div>
        `;
        cartItems.appendChild(cartItemElement);
    });
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.quantity-btn.decrease').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            updateCartQuantity(productId, -1);
        });
    });
    
    document.querySelectorAll('.quantity-btn.increase').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            updateCartQuantity(productId, 1);
        });
    });
    
    document.querySelectorAll('.remove-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
    
    // Update summary
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 10;
    const total = subtotal + shipping;
    
    cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    cartTotal.textContent = `$${total.toFixed(2)}`;
    cartItemsCount.textContent = `${cart.reduce((sum, item) => sum + item.quantity, 0)} items`;
}

// Update cart UI (icon, count)
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Show login page
function showLoginPage() {
    loginSection.classList.remove('hidden');
    signupSection.classList.add('hidden');
    productsSection.classList.add('hidden');
    cartSection.classList.add('hidden');
    navLogout.classList.add('hidden');
    navLogin.classList.remove('hidden');
}

// Show signup page
function showSignupPage() {
    loginSection.classList.add('hidden');
    signupSection.classList.remove('hidden');
    productsSection.classList.add('hidden');
    cartSection.classList.add('hidden');
}

// Show products page
function showProductsPage() {
    loginSection.classList.add('hidden');
    signupSection.classList.add('hidden');
    productsSection.classList.remove('hidden');
    cartSection.classList.add('hidden');
    navLogout.classList.remove('hidden');
    navLogin.classList.add('hidden');
}

// Show cart page
function showCartPage() {
    loginSection.classList.add('hidden');
    signupSection.classList.add('hidden');
    productsSection.classList.add('hidden');
    cartSection.classList.remove('hidden');
    renderCartItems();
}

// Login function
// Login function
async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Reset error messages
    loginEmailError.classList.add('hidden');
    loginPasswordError.classList.add('hidden');
    
    let isValid = true;
    
    // Validate email
    if (!email || !isValidEmail(email)) {
        loginEmailError.classList.remove('hidden');
        isValid = false;
    }
    
    // Validate password
    if (!password) {
        loginPasswordError.classList.remove('hidden');
        isValid = false;
    }
    
    if (!isValid) return;
    
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('isLoggedIn', 'true');
            showProductsPage();
        } else {
            alert(data.message || 'Login failed');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Login failed. Please try again.');
    }
}

// Signup function
function signup() {
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    // Reset error messages
    signupNameError.classList.add('hidden');
    signupEmailError.classList.add('hidden');
    signupPasswordError.classList.add('hidden');
    
    let isValid = true;
    
    // Validate name
    if (!name) {
        signupNameError.classList.remove('hidden');
        isValid = false;
    }
    
    // Validate email
    if (!email || !isValidEmail(email)) {
        signupEmailError.classList.remove('hidden');
        isValid = false;
    }
    
    // Validate password
    if (!password || password.length < 6) {
        signupPasswordError.classList.remove('hidden');
        isValid = false;
    }
    
    if (!isValid) return;
    
    // Simulate signup (in a real app, this would call an API)
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userName', name);
    showProductsPage();
}
// Event Listeners
loginBtn.addEventListener('click', login);
signupBtn.addEventListener('click', signup);

// Filter event listeners
priceFilter.addEventListener('input', () => {
    priceValue.textContent = `$${priceFilter.value}`;
    renderProducts();
});

categoryFilter.addEventListener('change', renderProducts);
sortBy.addEventListener('change', renderProducts);

// Initialize the app
initApp();