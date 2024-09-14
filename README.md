# Developer Community

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Environment Variables](#environment-variables)
- [Contact](#contact)

## Introduction

This project is a full-stack web application that allows users to manage tasks, providing both a frontend for users to interact with and a backend that stores user data. The application demonstrates CRUD operations, authentication, and dynamic updates using MERN stack.

## Features

- User authentication (Signup/Login)
- Create, Read, Update, and Delete (CRUD) operations
- Protected routes with JWT
- Responsive UI using React
- API integration with Express and MongoDB
- Error handling and form validation

## Technologies Used

### Frontend:

- **React** - For building the user interface
- **Normal CSS** - For styling

### Backend:

- **Node.js** - For backend server
- **Express.js** - For API and routing
- **MongoDB** - As the database
- **Mongoose** - For MongoDB object modeling

### Others:

- **JWT** - For user authentication
- **Axios** - For API requests
- **Bcrypt** - For password hashing

## Prerequisites

Before starting, ensure you have the following installed:

- **Node.js** (v14.x or higher)
- **MongoDB** (Locally or MongoDB Atlas)
- **Git** (for version control)

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Santos2175/Dev-Social-App.git

   ```

2. Go to the project directory

````bash
cd Dev-Social-App

# Install backend dependencies
```bash
npm install
````

# Install frontend dependencies

```bash
cd client
npm install
```

# Running the project

## at the current location where there is server.js for running backend

```bash
  npm start
```

## for frontend

```bash
cd client
npm start
```

# OR

## as there is concurrently dependency setup. so use following code for both client and server running

```bash
npm run dev
```

## Environment Variables

You will need to set up the following environment variables in the `.env` file for the backend:

REACT_APP_PORT=your port <br>
REACT_APP_MONGO_URI=your local mongoDB uri or cloud atlas mongo uri<br>
REACT_APP_JWT_SECRET=add your secret key

## Contact

For any questions or feedback:

- **Your Name** - [santoshgurung2175@gmail.com](mailto:santoshgurung2175@gmail.com)
- **GitHub** - [https://github.com/Santos2175](https://github.com/Santos2175)
