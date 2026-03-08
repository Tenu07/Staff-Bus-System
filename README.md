# 🚌 Staff Bus System

A **Staff Bus Management System** designed to manage staff transportation efficiently. The system allows administrators to manage buses, routes, drivers, and staff bookings through a centralized backend API.

This project is built using **Node.js, Express.js, and MongoDB**, providing a scalable RESTful backend for a staff transportation management platform.

---

# 📌 Features

* 👤 User authentication and management
* 🚌 Bus management
* 🧑‍✈️ Driver management
* 🗺 Route management
* 📅 Staff seat booking system
* 🔐 Secure password encryption using bcrypt
* 🪪 JWT-based authentication
* 🌐 RESTful API architecture

---

# 🛠 Tech Stack

**Backend**

* Node.js
* Express.js

**Database**

* MongoDB
* Mongoose

**Authentication**

* JSON Web Token (JWT)
* bcrypt

**Other Tools**

* dotenv
* body-parser
* cors
* nodemon

---

# 📂 Project Structure

```
Staff Bus System
│
├── controllers
│   ├── bookingController.js
│   ├── busController.js
│   ├── driverController.js
│   ├── routeController.js
│   └── userController.js
│
├── models
│   ├── bookingModel.js
│   ├── busModel.js
│   ├── driverModel.js
│   ├── RouteModel.js
│   └── userModel.js
│
├── index.js
├── .env
├── package.json
└── node_modules
```

---

# ⚙️ Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/staff-bus-system.git
```

### 2️⃣ Navigate to the project

```bash
cd staff-bus-system
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Configure environment variables

Create a `.env` file in the root directory.

Example:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 5️⃣ Run the server

```bash
npm start
```

Server will run on:

```
http://localhost:5000
```

---

# 🔗 API Modules

The backend provides APIs for:

* **User Management**
* **Bus Management**
* **Driver Management**
* **Route Management**
* **Booking Management**

Each module follows a **MVC structure** using controllers and models.

---

# 🔐 Authentication

The system uses:

* **JWT (JSON Web Token)** for secure authentication
* **bcrypt** for password hashing

Users must authenticate to access protected routes.

---

# 🚀 Future Improvements

* Frontend web or mobile interface
* Admin dashboard
* Live bus tracking (GPS integration)
* Seat availability visualization
* Notification system

---

# 👨‍💻 Author

Developed as part of a **Staff Transport Management System project**.

---

