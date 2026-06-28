# 📚 Library Management System API

A secure and scalable RESTful backend application for managing books, members, and borrowing activities in a library. Built using **Node.js**, **Express.js**, and **MongoDB**, featuring JWT authentication, role-based access control, and comprehensive request validation.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* Role-based access control
* Two user roles:

  * **Librarian**
  * **Member**
* Secure password hashing using **bcrypt**

### 📚 Book Management

* Add new books
* View all books
* View individual book details
* Update book information
* Delete books
* Automatic availability tracking

### 👥 Member Management

* User registration
* User login
* View registered members
* Delete member accounts
* View borrowed books

### 🔄 Borrow & Return System

* Borrow available books
* Return borrowed books
* Automatic inventory updates
* Borrowing history management

### ✅ Validation & Error Handling

* Request validation using **express-validator**
* Centralized error handling middleware
* Standardized API responses
* Proper HTTP status codes

---

# 🛠 Tech Stack

| Technology        | Usage                 |
| ----------------- | --------------------- |
| Node.js           | Runtime Environment   |
| Express.js        | Backend Framework     |
| MongoDB           | Database              |
| Mongoose          | ODM                   |
| JWT               | Authentication        |
| bcrypt            | Password Encryption   |
| express-validator | Validation            |
| dotenv            | Environment Variables |
| cors              | Cross-Origin Requests |

---

# 📁 Project Structure

```text
library-management-system/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   └── memberController.js
│
├── middleware/
│   ├── authMiddleware.js
│   ├── roleMiddleware.js
│   └── errorMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Book.js
│   └── Borrow.js
│
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── memberRoutes.js
│
├── validators/
│
├── .env
├── .gitignore
├── package.json
├── server.js
└── README.md
```

---

# 💻 Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/Roshan9912/library-management-system.git
cd library-management-system
```

---

## 2. Install Dependencies

```bash
npm install
```

Required packages:

```bash
npm install express mongoose jsonwebtoken bcrypt dotenv cors express-validator
```

Optional development dependency:

```bash
npm install --save-dev nodemon
```

---

## 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000

DATABASE_URL=your_mongodb_connection_string

JWT_SECRET=your_super_secret_jwt_key
```

Example:

```env
PORT=5000

DATABASE_URL=mongodb+srv://username:password@cluster.mongodb.net/libraryDB

JWT_SECRET=mysecretjwtkey123
```

---

## ⚠️ Important Security Note

Never commit your `.env` file to GitHub.

Add the following to `.gitignore`:

```gitignore
node_modules
.env
```

---

# 🗄 Database Setup

By design, the registration endpoint only creates **member accounts**.

To create a **librarian account**, manually insert the following document into MongoDB:

```json
{
  "name": "Admin Librarian",
  "email": "admin@library.com",
  "password": "bcrypt_hashed_password",
  "role": "librarian"
}
```

Generate a bcrypt password using:

```javascript
const bcrypt = require('bcrypt');

bcrypt.hash('admin123',10).then(console.log)
```

Example login credentials:

```text
Email:
admin@library.com

Password:
admin123
```

---

# ▶️ Running the Application

## Development Mode

```bash
npm run dev
```

---

## Production Mode

```bash
npm start
```

or

```bash
node server.js
```

Server runs on:

```text
http://localhost:5000
```

---

# 🔑 Authentication APIs

## Register Member

```http
POST /api/auth/register
```

### Request Body

```json
{
  "name": "Ramana",
  "email": "ramana@gmail.com",
  "password": "password123"
}
```

---

## Login

```http
POST /api/auth/login
```

### Request Body

```json
{
  "email": "ramana@gmail.com",
  "password": "password123"
}
```

### Response

```json
{
  "success": true,
  "token": "jwt_token_here"
}
```

---

# 📚 Book APIs

## Get All Books

```http
GET /api/books
```

Access:

```
Authenticated Users
```

---

## Get Single Book

```http
GET /api/books/:id
```

Access:

```
Authenticated Users
```

---

## Add Book

```http
POST /api/books
```

Access:

```
Librarian Only
```

Request:

```json
{
  "title": "Database Systems",
  "author": "Silberschatz",
  "quantity": 10
}
```

---

## Update Book

```http
PUT /api/books/:id
```

Access:

```
Librarian Only
```

---

## Delete Book

```http
DELETE /api/books/:id
```

Access:

```
Librarian Only
```

---

## Borrow Book

```http
POST /api/books/:id/borrow
```

Access:

```
Member Only
```

---

## Return Book

```http
POST /api/books/:id/return
```

Access:

```
Member Only
```

---

# 👥 Member APIs

## Get All Members

```http
GET /api/members
```

Access:

```
Librarian Only
```

---

## Delete Member

```http
DELETE /api/members/:id
```

Access:

```
Librarian Only
```

---

## Get Borrowed Books

```http
GET /api/members/me/books
```

Access:

```
Member Only
```

---

# 📡 API Summary

| Method | Endpoint              | Description     | Access        |
| ------ | --------------------- | --------------- | ------------- |
| POST   | /api/auth/register    | Register Member | Public        |
| POST   | /api/auth/login       | Login User      | Public        |
| GET    | /api/books            | Get All Books   | Authenticated |
| GET    | /api/books/:id        | Get Single Book | Authenticated |
| POST   | /api/books            | Add Book        | Librarian     |
| PUT    | /api/books/:id        | Update Book     | Librarian     |
| DELETE | /api/books/:id        | Delete Book     | Librarian     |
| POST   | /api/books/:id/borrow | Borrow Book     | Member        |
| POST   | /api/books/:id/return | Return Book     | Member        |
| GET    | /api/members          | Get Members     | Librarian     |
| DELETE | /api/members/:id      | Delete Member   | Librarian     |
| GET    | /api/members/me/books | Borrowed Books  | Member        |

---

# 🛑 Error Response Format

All errors follow a standardized format:

```json
{
  "success": false,
  "message": "Meaningful error message here."
}
```

Examples:

```json
{
  "success": false,
  "message": "Invalid credentials"
}
```

```json
{
  "success": false,
  "message": "Book not available"
}
```

---

# 🔒 Security Features

* JWT Authentication
* Password Hashing with bcrypt
* Role-Based Access Control
* Input Validation
* Protected Routes
* Environment Variables
* Centralized Error Handling

---

# 🧪 Testing

You can test the APIs using:

* Postman
* Thunder Client
* Insomnia

---

# 🚀 Deployment

The application can be deployed using:

* Render
* Railway
* Vercel (Backend Functions)
* AWS
* DigitalOcean

---

# 📤 Submission Details

### Live API URL

```
https://the-library-management.onrender.com
```


### GitHub Repository

```
https://github.com/Roshan9912/library-management-system
```

---

# 👨‍💻 Author

**Ramana Kokkula**

* Department: CSE (Data Science)
* Graduation Year: 2026
* GitHub: https://github.com/Roshan9912

---

# 📜 License

This project is developed for educational and assignment purposes.
