
# 🛒 E-Commerce API

![Node.js](https://img.shields.io/badge/Node.js-16.14+-green?style=flat-square&logo=node.js)
![Express](https://img.shields.io/badge/Express-4.17+-black?style=flat-square&logo=express)
![MongoDB](https://img.shields.io/badge/MongoDB-4.4+-green?style=flat-square&logo=mongodb)
![JWT](https://img.shields.io/badge/JWT-secure-orange?style=flat-square&logo=jsonwebtokens)

A **robust and scalable REST API** for powering your e-commerce platform built with **Node.js**, **Express**, and **MongoDB**. From user authentication to product management and orders, this API offers everything you need to create a fully functional online store backend.

## ✨ Key Features

- 🔐 **Authentication & Authorization**: Secure user management with JWT authentication.
- 🛍️ **Product Management**: Create, update, delete, and fetch products.
- 🧾 **Order Processing**: Full order lifecycle management, from cart to checkout.
- 🌟 **Review System**: Users can leave reviews and ratings for products.
- 🛡️ **Security First**: Follows best practices for password hashing, input validation, and data sanitization.
  
## 🚀 Quick Overview

| **Tech Stack**       | **Purpose**                                    |
|----------------------|------------------------------------------------|
| **Node.js**          | Backend runtime                                |
| **Express.js**       | Web application framework                      |
| **MongoDB + Mongoose**| Database & ORM                                |
| **JWT + bcrypt.js**  | Authentication & Password Hashing              |
| **Multer**           | File uploads (for product images)              |
| **dotenv**           | Environment variable management                |

## 🌍 API Endpoints

### **Authentication & User Management**
| Method | Endpoint                          | Description                      |
|--------|-----------------------------------|----------------------------------|
| `POST` | `/api/v1/auth/register`           | Register a new user              |
| `POST` | `/api/v1/auth/login`              | User login                       |
| `GET`  | `/api/v1/auth/logout`             | User logout                      |
| `GET`  | `/api/v1/user/showMe`             | Get current authenticated user   |
| `PATCH`| `/api/v1/user/updateUser`         | Update user details              |
| `PATCH`| `/api/v1/user/updateUserPassword` | Update user password             |

### **Product Management**
| Method  | Endpoint                        | Description                    |
|---------|---------------------------------|--------------------------------|
| `POST`  | `/api/v1/product`               | Create a new product           |
| `GET`   | `/api/v1/product`               | Get all products               |
| `GET`   | `/api/v1/product/:id`           | Get a product by ID            |
| `PATCH` | `/api/v1/product/:id`           | Update product details         |
| `DELETE`| `/api/v1/product/:id`           | Delete a product               |
| `POST`  | `/api/v1/product/uploadImage`   | Upload a product image         |

### **Order & Checkout**
| Method  | Endpoint                           | Description                    |
|---------|------------------------------------|--------------------------------|
| `POST`  | `/api/v1/order`                    | Create a new order             |
| `GET`   | `/api/v1/order`                    | Get all orders                 |
| `GET`   | `/api/v1/order/:id`                | Get order by ID                |
| `PATCH` | `/api/v1/order/:id`                | Update order status            |
| `GET`   | `/api/v1/order/showAllMyOrders`    | Get current user’s orders      |

### **Review System**
| Method  | Endpoint                          | Description                    |
|---------|-----------------------------------|--------------------------------|
| `POST`  | `/api/v1/review`                  | Create a new review            |
| `GET`   | `/api/v1/review`                  | Get all reviews                |
| `GET`   | `/api/v1/review/:id`              | Get a review by ID             |
| `PATCH` | `/api/v1/review/:id`              | Update a review                |
| `DELETE`| `/api/v1/review/:id`              | Delete a review                |

## 🛠️ Getting Started

### **Requirements**

- Node.js (v16.14+)
- MongoDB (local or cloud instance)
- A text editor like **VSCode** or **Sublime Text**

### **Installation**

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/e-commerce-api.git
    cd e-commerce-api
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add:

    ```bash
    MONGO_URI=<your-mongodb-uri>
    JWT_SECRET=<your-secret-key>
    JWT_LIFETIME=30d
    ```

4. **Start the development server:**
    ```bash
    npm run dev
    ```

> **Note**: You can use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to interact with the API.

## 🎯 Running Tests

Run tests using:

```bash
npm run test
```

> For continuous integration, you can use [Jest](https://jestjs.io/) or [Mocha](https://mochajs.org/) to ensure your API is working as expected.

## 📦 Deployment

To deploy the API on services like **Heroku**, **Vercel**, or **Render**, follow the deployment guide for those platforms. Ensure that you configure your environment variables properly.

```bash
# Example for Heroku
heroku config:set MONGO_URI=<your-mongo-uri>
heroku config:set JWT_SECRET=<your-secret-key>
```

## 🛡️ Security Considerations

- Ensure strong JWT secrets are used for token generation.
- Store sensitive data like passwords securely using `bcrypt`.
- Implement rate limiting and CORS policies for enhanced security.


---

> Developed by **[pachaiyappan](https://your-portfolio-link.com)** with ❤️ in Node.js.
