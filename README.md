# 🍅 TOMATO — Food Delivery Platform

<p align="center">
  <img src="https://img.shields.io/badge/🍅%20TOMATO-Food%20Delivery-EF4444?style=for-the-badge" alt="TOMATO Food Delivery">
  <br><br>
  <a href="https://food-delivery-frontend-s2l9.onrender.com/">
    <img src="https://img.shields.io/badge/🚀%20Live%20Application-User%20Panel-EF4444?style=for-the-badge" alt="User Panel">
  </a>
  <a href="https://food-delivery-admin-wrme.onrender.com/">
    <img src="https://img.shields.io/badge/⚙️%20Admin%20Panel-Management-111827?style=for-the-badge" alt="Admin Panel">
  </a>
  <a href="https://github.com/Ganeshbasani/food_delivery">
    <img src="https://img.shields.io/badge/📦%20GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repository">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/MERN-Stack-3FA037?style=flat-square" alt="MERN Stack">
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/Stripe-635BFF?style=flat-square&logo=stripe&logoColor=white" alt="Stripe">
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" alt="JWT">
</p>

<p align="center">
  <strong>A full-stack MERN food ordering platform with secure authentication, online payments, order management, and dedicated user and admin experiences.</strong>
</p>

---

## 🚀 Live Application

| Application | Link |
| :--- | :--- |
| 🌐 **User Panel** | https://food-delivery-frontend-s2l9.onrender.com/ |
| ⚙️ **Admin Panel** | https://food-delivery-admin-wrme.onrender.com/ |
| 📦 **GitHub Repository** | https://github.com/Ganeshbasani/food_delivery |

---

## 📌 Overview

**TOMATO** is a full-stack food delivery and online food ordering application built using the **MERN Stack**.

The platform provides separate experiences for customers and administrators. Customers can browse food products, authenticate securely, manage their cart, place orders, and complete payments through Stripe. Administrators can manage food products and monitor and manage customer orders through a dedicated admin panel.

The project follows a client-server architecture with a React-based frontend, dedicated administrative interface, Node.js/Express backend, MongoDB database, authenticated REST APIs, and Stripe payment integration.

---

## ✨ Key Features

### 👤 User Experience

- 🍔 Browse available food products
- 🔎 Filter food products
- 🛒 Add products to cart
- 📦 Place food orders
- 💳 Stripe payment integration
- 🔐 Secure login and signup
- 🚪 Logout functionality
- 🔑 JWT-based authentication
- 📱 Responsive user interface
- 🔔 User-friendly alerts and feedback

### ⚙️ Admin Experience

- 🔐 Admin authentication
- 🍔 Product management
- ➕ Add food products
- 📝 Manage food products
- 📦 Order management
- 🔄 Update order information
- 📊 Centralized operational interface

### 🔒 Security

- JWT-based authentication
- Password hashing using Bcrypt
- Authenticated API endpoints
- Role-based identification
- Environment-based secret configuration
- Protected payment credentials

### 💳 Payments

- Stripe payment integration
- Secure server-side payment configuration
- Order flow connected with payment processing
- Frontend redirect handling after payment

---

## 🏗️ System Architecture

```text
                         ┌─────────────────────────┐
                         │       TOMATO App        │
                         │     Food Delivery       │
                         └────────────┬────────────┘
                                      │
                  ┌───────────────────┴───────────────────┐
                  │                                       │
                  ▼                                       ▼
        ┌──────────────────┐                    ┌──────────────────┐
        │    User Panel    │                    │   Admin Panel    │
        │     React.js     │                    │     React.js     │
        └────────┬─────────┘                    └────────┬─────────┘
                 │                                       │
                 └──────────────────┬────────────────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │     REST APIs       │
                         │ Node.js + Express   │
                         └──────────┬──────────┘
                                    │
                   ┌────────────────┼────────────────┐
                   │                │                │
                   ▼                ▼                ▼
          ┌────────────────┐ ┌──────────────┐ ┌───────────────┐
          │  JWT / Bcrypt  │ │   MongoDB    │ │    Stripe     │
          │ Authentication │ │   Database   │ │   Payments    │
          └────────────────┘ └──────────────┘ └───────────────┘
```

---

## 🔄 Application Workflow

```text
Customer
   │
   ▼
Register / Login
   │
   ▼
Browse Food Products
   │
   ▼
Filter Products
   │
   ▼
Add Items to Cart
   │
   ▼
Review Cart
   │
   ▼
Place Order
   │
   ▼
Stripe Payment
   │
   ▼
Order Created
   │
   ▼
Admin Receives Order
   │
   ▼
Admin Manages Order
   │
   ▼
Order Status Updated
```

---

## 🧩 Core Modules

| Module | Responsibility |
| :--- | :--- |
| 👤 **Authentication** | Login, signup, logout, JWT authentication |
| 🍔 **Food Catalog** | Food product display and filtering |
| 🛒 **Cart** | Add, remove, and manage cart items |
| 📦 **Orders** | Order creation and order management |
| 💳 **Payments** | Stripe payment processing |
| ⚙️ **Admin Panel** | Product and order administration |
| 🔐 **Authorization** | Authenticated and role-aware API access |
| 🔔 **Alerts** | User feedback and application notifications |

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Authentication** | JWT, Bcrypt |
| **Payments** | Stripe |
| **File Uploads** | Multer |
| **API Architecture** | REST APIs |
| **Deployment** | Render |
| **Version Control** | Git, GitHub |

---

## 📂 Project Structure

```text
food_delivery/
│
├── frontend/                       # Customer-facing React application
│   ├── src/
│   │   ├── components/             # Reusable UI components
│   │   ├── pages/                  # Application pages
│   │   ├── context/                # Application state / StoreContext
│   │   └── assets/                 # Frontend assets
│   └── package.json
│
├── admin/                          # Admin React application
│   ├── src/
│   │   ├── components/             # Admin UI components
│   │   ├── pages/                  # Admin pages
│   │   └── assets/                 # Admin assets
│   └── package.json
│
├── backend/                        # Node.js + Express API
│   ├── controllers/                # Business logic
│   ├── models/                     # MongoDB data models
│   ├── routes/                     # REST API routes
│   ├── middleware/                 # Authentication / middleware
│   ├── uploads/                    # Uploaded product assets
│   ├── config/                     # Configuration
│   └── server.js                   # Backend entry point
│
├── .gitignore
└── README.md
```

> The exact folder names may vary depending on the current repository structure.

---

## 🔐 Authentication & Authorization

TOMATO uses **JWT-based authentication** for protected application functionality.

The authentication flow is designed around:

```text
User
 │
 ▼
Login / Signup
 │
 ▼
Credentials Validation
 │
 ▼
Password Verification
 │
 ▼
JWT Token Generation
 │
 ▼
Authenticated Requests
 │
 ▼
Protected REST APIs
```

Passwords are protected using **Bcrypt hashing**, while JWT tokens are used to authenticate protected API requests.

Role-based identification allows the application to distinguish between regular users and administrative functionality.

---

## 💳 Stripe Payment Integration

TOMATO integrates **Stripe** to support online payment processing.

The payment workflow connects:

```text
Cart
  ↓
Order Request
  ↓
Stripe Checkout / Payment
  ↓
Payment Completion
  ↓
Order Processing
  ↓
Admin Order Management
```

Stripe secret credentials are stored through environment variables rather than being hard-coded into the application.

---

## 🌐 REST API Architecture

The backend follows a REST-oriented architecture for communication between the frontend applications and server.

The API layer handles functionality including:

- Authentication
- User operations
- Product operations
- Cart/order workflows
- Payment processing
- Admin operations
- Order management

Protected endpoints require valid authentication where applicable.

---

## 📸 Application Screenshots

### 🏠 Hero / Landing Page

![Hero](https://i.ibb.co/59cwY75/food-hero.png)

### 🍔 Food Products

![Products](https://i.ibb.co/JnNQPyQ/food-products.png)

### 🛒 Shopping Cart

![Cart](https://i.ibb.co/t2LrQ8p/food-cart.png)

### 🔐 Login

![Login](https://i.ibb.co/s6PgwkZ/food-login.png)

---

## 🚀 Getting Started

### Prerequisites

Make sure the following are installed:

- **Node.js**
- **npm**
- **MongoDB** or a MongoDB connection string
- **Git**
- **Stripe account / API credentials** for payment functionality

---

## 📦 Clone the Repository

```bash
git clone https://github.com/Ganeshbasani/food_delivery.git
cd food_delivery
```

---

## 💻 Frontend Setup

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the frontend:

```bash
npm start
```

---

## ⚙️ Admin Panel Setup

Open another terminal from the project root:

```bash
cd admin
```

Install dependencies:

```bash
npm install
```

Start the admin application:

```bash
npm start
```

---

## 🔧 Backend Setup

Open another terminal from the project root:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
npm start
```

For development, if `nodemon` is configured in the project:

```bash
nodemon server.js
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend/` directory.

```env
JWT_SECRET=YOUR_SECRET_TEXT
SALT=YOUR_SALT_VALUE
MONGO_URL=YOUR_DATABASE_URL
STRIPE_SECRET_KEY=YOUR_STRIPE_SECRET_KEY
```

### Environment Variable Description

| Variable | Purpose |
| :--- | :--- |
| `JWT_SECRET` | Secret used for JWT authentication |
| `SALT` | Password hashing configuration |
| `MONGO_URL` | MongoDB connection string |
| `STRIPE_SECRET_KEY` | Stripe server-side secret key |

> ⚠️ Never commit your `.env` file or expose production credentials in the repository.

---

## 🔗 Configure Application URLs

The frontend and admin applications communicate with the backend through the configured backend URL.

Update the backend URL in the relevant frontend/admin configuration.

### Admin

Update the backend URL in:

```text
admin/src/App.jsx
```

Example:

```javascript
const url = "YOUR_BACKEND_URL";
```

### Frontend

Update the backend URL in the relevant `StoreContext` configuration.

Example:

```javascript
const url = "YOUR_BACKEND_URL";
```

### Backend

Configure the frontend URL used by the order/payment flow in the relevant order controller.

Example:

```javascript
const frontend_url = "YOUR_FRONTEND_URL";
```

> Use environment variables for production deployments rather than hard-coding URLs wherever the application configuration supports it.

---

## 🧪 Development & Verification

Before deploying the application, verify the following:

- [ ] User registration works
- [ ] User login works
- [ ] JWT authentication works
- [ ] Password hashing works
- [ ] Food products load correctly
- [ ] Product filtering works
- [ ] Add-to-cart functionality works
- [ ] Order placement works
- [ ] Stripe payment flow works
- [ ] Admin login works
- [ ] Product management works
- [ ] Order management works
- [ ] Protected APIs reject unauthorized requests
- [ ] Frontend communicates correctly with backend
- [ ] Production URLs are configured correctly

---

## 🚀 Deployment

The application is deployed on **Render** with separate application components.

### 🌐 User Application

https://food-delivery-frontend-s2l9.onrender.com/

### ⚙️ Admin Application

https://food-delivery-admin-wrme.onrender.com/

### 📦 Source Code

https://github.com/Ganeshbasani/food_delivery

For production deployment, ensure:

- Environment variables are configured securely.
- MongoDB connection settings are correct.
- Stripe credentials are configured.
- Frontend and backend URLs point to the correct production services.
- Secrets are not committed to Git.
- CORS configuration allows the required deployed applications.

---

## 🔒 Security Considerations

The application incorporates several security-focused practices:

- 🔐 JWT authentication
- 🔑 Bcrypt password hashing
- 🛡️ Protected REST APIs
- 👥 Role-based identification
- 🔒 Environment-based secrets
- 💳 Server-side Stripe secret configuration
- 🚫 No hard-coded production credentials

> Production deployments should always use HTTPS, secure environment variables, appropriate CORS policies, and regularly rotated credentials.

---

## 🛣️ Roadmap

- [x] MERN-based food ordering platform
- [x] User authentication
- [x] JWT authentication
- [x] Bcrypt password hashing
- [x] Food product catalog
- [x] Shopping cart
- [x] Order placement
- [x] Stripe payment integration
- [x] Admin panel
- [x] Product management
- [x] Order management
- [x] REST APIs
- [x] Render deployment
- [ ] Enhanced order tracking
- [ ] Improved analytics dashboard
- [ ] Customer order history enhancements
- [ ] Notifications
- [ ] Advanced admin reporting

---

## 🤝 Contributing

Contributions are welcome.

### Contribution Workflow

```bash
# Fork the repository

# Clone your fork
git clone <your-fork-url>

# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes

# Stage changes
git add .

# Commit changes
git commit -m "feat: describe your change"

# Push your branch
git push origin feature/your-feature-name
```

Then open a Pull Request with a clear explanation of your changes.

---

## 🐛 Bug Reports & Feature Requests

If you discover a bug or have an idea for improving TOMATO, please open an issue in the repository.

When reporting a bug, include:

- Description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser/device information
- Screenshots when applicable

---

## 📄 License

This project is licensed under the **MIT License**.

See the [`LICENSE`](./LICENSE) file for the complete license text.

---

## 👨‍💻 Author

### Ganesh Basani

**GitHub:**  
https://github.com/Ganeshbasani

**LinkedIn:**  
https://www.linkedin.com/in/ganesh-basani-934061201/

**Project Repository:**  
https://github.com/Ganeshbasani/food_delivery

---

## 🙏 Acknowledgements

This project was built using the following technologies and services:

- React
- Node.js
- Express.js
- MongoDB
- Stripe
- JWT
- Bcrypt
- Multer
- Render

---

## ⭐ Support the Project

If you find **TOMATO** useful or interesting:

- ⭐ Star the repository
- 🐛 Report bugs
- 💡 Suggest features
- 🔧 Contribute improvements
- 📢 Share the project

---

<p align="center">

### 🍅 TOMATO

<strong>Order smarter. Eat better.</strong>

<br><br>

<a href="https://food-delivery-frontend-s2l9.onrender.com/">
🚀 Open User Application
</a>

&nbsp;&nbsp;•&nbsp;&nbsp;

<a href="https://food-delivery-admin-wrme.onrender.com/">
⚙️ Open Admin Panel
</a>

&nbsp;&nbsp;•&nbsp;&nbsp;

<a href="https://github.com/Ganeshbasani/food_delivery">
📦 View Source
</a>

</p>
