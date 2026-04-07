# 🛒 MERN E-Commerce Web Application

A full-stack e-commerce web application built using the **MERN stack (MongoDB, Express, React, Node.js)**. The platform enables users to browse products, manage carts, and securely place orders with authentication and a responsive UI.

🔗 **Live Demo:** https://mern-frontend-hbuu.vercel.app/

---

## 🚀 Features

- 🔐 User Authentication (Login / Register using JWT)
- 🛍️ Product browsing and search functionality
- 🛒 Add to Cart & manage cart items
- 💳 Secure checkout workflow
- 📦 Order placement & tracking
- 🧑‍💼 Admin panel for product management *(if implemented)*
- 📱 Fully responsive UI for all devices
- ⚡ RESTful APIs for fast and scalable performance

---

## 🧰 Tech Stack

### Frontend
- React.js  
- Redux / Context API *(if used)*  
- Tailwind CSS / CSS  

### Backend
- Node.js  
- Express.js  

### Database
- MongoDB (Mongoose)

### Other Tools
- JWT Authentication  
- REST APIs  
- Vercel (Frontend Deployment)  
- *(Add backend hosting if applicable: Render / Railway / AWS)*

---

## 📂 Project Structure
ecommerce-app/
│
├── frontend/ # React application
├── backend/ # Node.js + Express server
├── models/ # Mongoose schemas
├── routes/ # API routes
├── controllers/ # Business logic
└── config/ # Database & environment configs


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
2️⃣ Setup Backend
cd backend
npm install
Create a .env file inside the backend folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
Run the backend server:

npm start
3️⃣ Setup Frontend
cd frontend
npm install
npm start
🔐 Environment Variables
Variable	Description
MONGO_URI	MongoDB connection string
JWT_SECRET	Secret key for authentication
PORT	Backend server port
💡 Key Highlights
Designed a scalable full-stack architecture using MERN

Implemented secure authentication with JWT

Built RESTful APIs for efficient client-server communication

Ensured responsive UI and optimized performance
