# 🔐 MERN Authentication Web App

This is a full-stack authentication web application built using the **MERN** stack — **MongoDB**, **Express.js**, **React.js**, and **Node.js**. It features secure user registration, login, password reset, and email verification — all built with best practices.

---

## 🚀 Features

- 🔐 User registration and login
- ✅ Email verification for account activation
- 🔑 Forgot password & reset password via email
- 🛡️ JWT-based authentication with HTTP-only cookies
- 🔒 Protected routes based on auth state
- 🧾 Form validation (frontend + backend)
- 🔁 Persistent sessions
- 🧼 Clean and responsive UI

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **Axios** (API integration)
- **React Router DOM** (Routing)
- **React Toastify** (Notifications)
- **Tailwind CSS** or plain CSS

### Backend
- **Node.js** + **Express.js**
- **MongoDB** with **Mongoose**
- **jsonwebtoken**
- **bcryptjs**
- **cookie-parser**
- **nodemailer**
- **dotenv**

---

## 📁 Folder Structure

mern-authentication/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── package.json
├── server/ # Node.js backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── middlewares/
│ ├── utils/
│ ├── server.js
│ └── .env
├── README.md
└── package.json

## ⚙️ Installation & Setup

### Clone the Repository
```bash
  git clone https://github.com/yourusername/mern-authentication.git
  cd mern-authentication
1. Backend Setup
bash
Copy
Edit
cd server
npm install
Create a .env file:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
CLIENT_URL=http://localhost:5173
Start the server:

bash
Copy
Edit
npm run dev

2. Frontend Setup

cd ../client
npm install
npm run dev
The app will run at http://localhost:5173 with backend on http://localhost:5000.

🔐 Authentication Flow
Signup → A verification email is sent.

Verify Email → The user clicks a link to activate the account.

Login → A JWT is created and sent via HTTP-only cookie.

Forgot Password → An email with a reset link is sent.

Reset Password → User resets password and regains access.

Protected Routes → JWT is validated for secure access.

📬 API Endpoints
Auth
Method	Endpoint	Description
POST	/api/register	Register new user
POST	/api/login	Login existing user
GET	/api/activate/:token	Activate account via email link
GET	/api/logout	Logout and clear cookie

Password
Method	Endpoint	Description
POST	/api/forgot-password	Send password reset email
POST	/api/reset-password/:token	Reset password using token

Protected
Method	Endpoint	Description
GET	/api/profile	Get authenticated user

🤝 Contributing
Fork the repository

Create your feature branch: git checkout -b feature-name

Make your changes and commit: git commit -m "Add feature"

Push to GitHub: git push origin feature-name

Submit a pull request

📄 License
This project is open-source and available under the MIT License.

🌐 Live Demo
👉 [Live App](https://mern-authentication-pj06.netlify.app/)

👤 Author
Pallab JB
📧 pallabjyotibora75@gmail.com
