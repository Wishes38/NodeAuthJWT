# **Node.js Authentication System with JWT**

A modular and scalable **Node.js** authentication system built with **Express.js**, **MongoDB**, and **JWT**. This project provides a secure and extensible solution for user authentication and role-based access control.

Features

### **Modular Architecture**

-   Organized into controllers, routes, services, and middlewares for maintainability and scalability.

### **Authentication and Authorization**

-   Secure password hashing with **bcrypt**.
-   **JWT** for stateless authentication and session management.
-   Refresh token mechanism for seamless session renewal.
-   Role-based access control for restricted routes (e.g., admin panel).

### **Rate Limiting**

-   Protects endpoints from brute force attacks using **express-rate-limit**.

### **Secure Cookie Management**

-   Refresh tokens stored securely in **httpOnly** cookies to prevent XSS attacks.

### **MongoDB Integration**

-   User and token management using **Mongoose** models.
-   Token blacklist implementation for secure logout functionality.

### **Environment Configuration**

-   Secrets and configurations managed using **dotenv**.


## **Packages Used**

### **Core Packages**

-   **[Express.js](https://expressjs.com/)**: Web application framework for building APIs.
-   **[Mongoose](https://mongoosejs.com/)**: MongoDB object modeling for Node.js.
-   **[dotenv](https://www.npmjs.com/package/dotenv)**: Environment variable management.

### **Authentication**

-   **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**: Implements JWT for authentication.
-   **[bcrypt](https://www.npmjs.com/package/bcrypt)**: Hashes passwords for secure storage.

### **Middleware**

-   **[express-rate-limit](https://www.npmjs.com/package/express-rate-limit)**: Limits the number of requests to prevent brute force attacks.
-   **[cors](https://www.npmjs.com/package/cors)**: Enables cross-origin requests.
-   **[cookie-parser](https://www.npmjs.com/package/cookie-parser)**: Parses cookies for managing refresh tokens.

### **Development Tools**

-   **[Nodemon](https://www.npmjs.com/package/nodemon)**: Restarts the server during development.
-   **[ESM](https://www.npmjs.com/package/esm)**: Enables ECMAScript modules (ES6 syntax).
## **Getting Started**

### **1. Clone the Repository**

`git clone https://github.com/your-username/your-repository.git
cd your-repository` 

### **2. Install Dependencies**

`npm install` 

### **3. Configure Environment Variables**

Create a `.env` file in the root directory and add the following variables:

`MONGO_URI=mongodb://localhost:27017/your_database
JWT_SECRET=your_access_token_secret
JWT_REFRESH=your_refresh_token_secret
CORS_ORIGIN=http://localhost:3000` 

### **4. Start the Server**

`npm start` 

### **5. Access the Application**

-   Development mode: `http://localhost:3000`
-   Admin panel: Restricted to `admin` role.

----------

## **Future Improvements**

-   Add testing with **Jest** or **Mocha**.
-   Implement email verification during user registration.
-   Integrate OAuth providers (e.g., Google, GitHub).
-   Improve error handling and logging mechanisms.
