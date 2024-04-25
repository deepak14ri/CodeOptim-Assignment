# CodeOptim Backend Assignment

Create an Application For E-commerce Platform.
Create an E-commerce Platform’s API Endpoints, which are mentioned below:
(MongoDB is preferable.)
• Register API for our customers. Store admin credentials using seeding or
migration.
• Login API for our customers.
• Create the crud APIs for the product.
• Create add-to-cart functionality with payment gateway integration(You can
create a Sandbox account for any service like Stripe or PayPal. Etc.,.
Requirements:
They can add products to the cart without login, but when they pay the
amount, they need to do login. (make this validation from the backend before payment.)

## Installation

1. Install dependencies:

"dependencies": {
    "bcrypt": "^5.1.1",
    "body-parser": "^1.20.2",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.4.1",
    "express": "^4.18.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.1.1",
    "nodemon": "^3.1.0"
  }

## Usage

### Running the Server

To start the server, run the following command:

# npm start

### Running the Client

To run the client, use the following command:

# npm run dev

### Other Commands

To get node_modules

npm install

### Endpoints

#### User Signup
- **Method:** POST
- **URL:** http://localhost:4000/user/signup
- **Description:** Endpoint for user registration/signup.

#### User Login
- **Method:** GET
- **URL:** http://localhost:4000/user/login
- **Description:** Endpoint for user login.

#### Product and Category CRUD Operations
- **Method:** GET/POST/PUT/PATCH/DELETE
- **URL:** http://localhost:4000/user
- **Description:** Endpoint to perform CRUD operations for products or categories. Depending on the request type and parameters, you can create, retrieve, update, or delete products or categories.

