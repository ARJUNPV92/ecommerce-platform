🛒 E-Commerce Platform (Full Stack)

A production-ready e-commerce platform built with Node.js, Express, PostgreSQL, and React, following a modular layered architecture with RBAC, coupon engine, cart & order flow, bulk import, and local image storage.

🚀 Features
Backend

Modular layered architecture (Controller → Service → Repository)

JWT authentication & Role-Based Access Control (RBAC)

Audit logging for sensitive operations

Product catalog (Categories → Products → Variants)

SKU generation

Coupon engine (Percent, Flat, BOGO, scopes, limits)

Cart & order lifecycle

Bulk import (CSV) with dry-run & transaction safety

Local image upload with thumbnails

PostgreSQL database

Frontend

React-based Admin Panel & Storefront

Login & Register flow

Role-based UI (Admin vs User)

Product browsing

Cart & coupon preview

Admin bulk import & product management

Environment-based API configuration

🧱 Tech Stack

Backend

Node.js

Express.js

PostgreSQL

JWT

Multer (local uploads)

Frontend

React

Axios

React Router

Context API

📁 Project Structure (Backend)
src/
├── modules/
│   ├── auth
│   ├── users
│   ├── catalog
│   ├── images
│   ├── coupons
│   ├── cart
│   ├── orders
│   └── bulk-import
├── common/
│   ├── middlewares
│   ├── audit
│   └── exceptions
├── config/
├── database/
└── server.js

⚙️ Environment Setup
Backend .env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecommerce
DB_USER=postgres
DB_PASSWORD=123456
JWT_SECRET=

Frontend .env
REACT_APP_API_BASE_URL=http://localhost:4000/api

▶️ Run the Project
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm start


Backend runs on 4000, frontend on 3000.

🔐 Roles

Admin – full access

User – storefront only

Admin role must be assigned in DB.

📦 Bulk Import

CSV upload

Dry-run support

Transaction-safe commit

Upsert by SKU

🧠 Architecture Principles

No business logic in controllers

No DB logic in services

Transaction safety

Clear separation of concerns

Production-ready structure

📌 Notes

Uses local file storage (no cloud dependency)

Designed for scalability and interview readiness

Easily extendable to S3, Redis, or microservices

👨‍💻 Author

Built as a full-stack production-grade system demonstrating real-world backend & frontend architecture.
