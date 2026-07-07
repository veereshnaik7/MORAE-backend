# Task Management App - Backend

## Overview

This is the backend API for a Task Management App. It provides authentication, email verification, password reset, user profile APIs, and CRUD APIs for managing tasks.

The backend is built using Node.js, Express.js, MongoDB, and Mongoose.

## Features

- User registration
- User login
- JWT authentication
- HTTP-only cookie based authentication
- Email verification using OTP
- Forgot password using OTP
- Reset password
- Change password
- Logout
- Protected user profile APIs
- Create task
- Fetch tasks for logged-in user
- Fetch single task
- Update task
- Delete task
- Pagination support for task listing
- Status filter support for tasks
- MongoDB database integration using Mongoose
- Nodemailer email utility

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- Nodemailer
- dotenv
- CORS

## Project Setup

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Run production server:

```bash
npm start
```

## Environment Variables

Create a `.env` file in the backend root folder.

Example:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_token_secret
CLIENT_URL=https://morae-frontend.vercel.app
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
```

Use your actual MongoDB and email credentials.

## Folder Structure

```txt
backend/
  config/
    configuration.js
    mongoConn.js
  controllers/
    auth.controller.js
    task.controller.js
    user.controller.js
  middlewares/
    authMiddleware.js
  models/
    user.js
    task.js
    otp.js
  routes/
    auth.routes.js
    task.routes.js
    user.routes.js
    index.js
  utils/
    authUtils.js
    emailUtils.js
    responseHandler.js
  index.js
```

## Authentication APIs

### Register

```http
POST /api/auth/register
```

Registers a new user and sends verification OTP to email.

### Verify User

```http
POST /api/auth/isverify
```

Verifies user email using OTP.

### Login

```http
POST /api/auth/login
```

Logs in a verified user and sets JWT cookies.

### Logout

```http
POST /api/auth/logout
```

Logs out the user and clears cookies.

### Forgot Password

```http
POST /api/auth/forgot-password
```

Sends password reset OTP to email.

### Reset Password

```http
POST /api/auth/reset-password
```

Resets password using OTP.

### Change Password

```http
POST /api/auth/change-password
```

Changes password for logged-in user.

## Task APIs

All task APIs are protected and require login.

### Create Task

```http
POST /api/tasks
```

Creates a new task.

### Get Tasks

```http
GET /api/tasks
```

Fetches logged-in user's tasks.

Supports pagination and filters.

Example:

```http
GET /api/tasks?page=1&limit=10&status=pending&search=task
```

### Get Single Task

```http
GET /api/tasks/:id
```

Fetches a single task by ID.

### Update Task

```http
PUT /api/tasks/:id
```

or

```http
PATCH /api/tasks/:id
```

Updates task title, description, status, priority, or due date.

### Delete Task

```http
DELETE /api/tasks/:id
```

Deletes a task.

## User APIs

### Get Profile

```http
GET /api/users/me
```

Fetches logged-in user profile.

### Update Profile

```http
PATCH /api/users/update
```

Updates user profile details.

## Task Model

Each task contains:

```txt
title
description
status
priority
dueDate
userId
```

Status values:

```txt
pending
completed
```

Priority values:

```txt
low
medium
high
```

## Assignment Requirements Covered

- Express.js REST API
- MongoDB database
- Mongoose models
- JWT authentication
- Login and Register APIs
- Protected task CRUD APIs
- Create task
- Fetch all logged-in user's tasks
- Fetch single task
- Update task
- Delete task
- Mark task as completed
- API integration support for frontend
