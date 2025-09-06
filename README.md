# 🛍️ ShopEasy – Full Stack E-Commerce Web App

ShopEasy is a **full-stack e-commerce application** built as part of my internship assessment.  
It demonstrates my ability to design, build, and deploy a complete web solution with authentication, product management, and cart functionality.  

---

## 🚀 Features
- 🔑 **User Authentication** – Secure signup & login using JWT  
- 🛒 **Cart Management** – Add, remove, and update items  
- 📦 **Product Listing** – Browse items with filters (category, price, sorting)  
- 💾 **Persistent Cart** – Items remain saved after logout & login  
- 📱 **Responsive Design** – User-friendly interface for both desktop & mobile  

---

## 🛠️ Tech Stack
**Frontend**: HTML, CSS, JavaScript (Vanilla JS)  
**Backend**: Node.js, Express.js  
**Database**: MongoDB Atlas  
**Authentication**: JSON Web Token (JWT)  
**Deployment**: Netlify (Frontend), Render/Railway (Backend)  

---

## 📂 Project Structure
ecommerce-spa/
├── 📄 index.html # Main frontend application
├── 🎨 styles.css # Complete styling with CSS variables
├── ⚡ script.js # Frontend JavaScript functionality
├── 📖 README.md # Project documentation
└── 📦 backend/ # Node.js Express backend
├── 🚀 server.js # Main server entry point
├── 📋 package.json # Dependencies and scripts
├── 📋 package-lock.json # Locked dependencies
├── 🔧 .env # Environment variables (gitignored)
├── 📊 models/ # Database models
├── 🛣️ routes/ # API route handlers
│ ├── 🔐 auth.js # Authentication endpoints
│ ├── 🛒 cart.js # Shopping cart endpoints
│ └── 📦 products.js # Product API endpoints
└── 🧩 middleware/ # Custom middleware
└── 🔒 auth.js # JWT authentication middleware
