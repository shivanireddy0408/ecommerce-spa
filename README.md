Updated upstream
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
├── index.html         # Main frontend file
├── styles.css         # Styling
├── script.js          # Frontend logic
└── backend/
    ├── server.js      # Server entry
    ├── package.json
    ├── .env           # Environment variables
    ├── models/        # Database models
    ├── routes/        # API route handlers
        ├── auth.js
        ├── cart.js
        └── products.js


# 🛍️ ShopEasy - E-Commerce SPA

ShopEasy is my internship project, a full-stack e-commerce app where I built user authentication, product browsing, and cart management from scratch.

## 🌐 Live Demo

- **Frontend**: https://tryshopeasy04.netlify.app/
- **Backend API**:  https://ecommerce-spa-7xno.onrender.com/
- **GitHub Repository**: https://github.com/shivanireddy0408/ecommerce-spa 

**Note:**
Note: The backend is on Render’s free tier, so it might take a few seconds to wake up.
 If you see a “Bad Gateway” error, just wait 30 sec and refresh.

## ✨ Features
- 🔐 **User Authentication** - Login/register with JWT tokens
- 🛒 **Product Catalog** - Filter by category, price, and sort options
- 🛍️ **Shopping Cart** - Add/remove items with persistent storage
- 📱 **Responsive Design** - Works on all device sizes
- ⚡ **RESTful APIs** - Clean backend architecture

## 🛠️ Tech Stack
**Frontend:** HTML5, CSS3, Vanilla JavaScript  
**Backend:** Node.js, Express.js, MongoDB  
**Authentication:** JWT, bcryptjs  
**Database:** MongoDB with Mongoose  
**Deployment:** Netlify (Frontend), Railway (Backend)

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Modern web browser

### Installation

1. **Clone the repository**
   
   git clone https://github.com/shivanireddy0408/ecommerce-spa.git
   cd ecommerce-spa

2 **Install backend dependencies**
   cd backend
   npm install

3. **Set up environment variables**
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret


