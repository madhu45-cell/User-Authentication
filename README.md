# User Authentication System 🔐

> A secure user authentication system built with the MERN stack (MongoDB, Express, React, Node.js) featuring email OTP verification, JWT authentication, and password reset.

![Logo](./assets/logo.png)

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## About

### Overview

**User Authentication System** is a full-stack authentication project that allows users to register, verify their email via OTP, log in securely using JWT tokens, and reset their password via OTP. It's designed for modern web applications requiring reliable user identity verification and security.

This project uses:
- **React** on the frontend
- **Node.js + Express** on the backend
- **MongoDB** for the database
- **Brevo (SMTP)** for email delivery
- **JWT & Cookies** for session management

### Motivation

I built this project to learn and implement a complete authentication system with real-world features like email verification, session management, and OTP handling. It's reusable in any full-stack web application requiring authentication and secure access control.

---

## Features

- 🔐 **User Registration & Login**
- 📩 **Email Verification via OTP**
- 🔁 **Password Reset with OTP**
- 🍪 **JWT & HTTP-Only Cookies**
- 🛡️ **Protected Routes**
- 💾 **MongoDB with Mongoose**
- 📬 **SMTP Email via Brevo (Sendinblue)**
- 📱 **Responsive UI**

---

## Tech Stack

### Frontend

- React.js
- React Router
- Tailwind CSS / SCSS
- Axios
- React Toastify

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT (jsonwebtoken)
- bcrypt.js
- Nodemailer (SMTP using Brevo)
- dotenv for environment variables
- cors for handling cross-origin requests

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/madhu45-cell/User-Authentication.git
cd User-Authentication

