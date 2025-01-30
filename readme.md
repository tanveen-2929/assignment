# Space Cart

Space Cart is a full-stack e-commerce web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It provides a seamless shopping experience with user authentication, product browsing, cart management, and order processing.

## Features

- User authentication (signup, login, JWT-based authentication)
- Product listing and search functionality
- Shopping cart and checkout system
- Order history and user dashboard
- Admin panel for managing products and orders
- Secure payment integration

## Tech Stack

- **MongoDB** - NoSQL database for storing product and user data
- **Express.js** - Backend framework for handling API requests
- **React.js** - Frontend framework for building the UI
- **Node.js** - Server-side runtime for handling requests

## Installation

### Prerequisites
Make sure you have the following installed:
- Node.js
- MongoDB
- Docker (optional, for containerized setup)

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/Arjun123sh/assignment.git
   cd assignment
   ```
2. Set up environment variables:
   - Create a `.env` file in the backend directory with necessary environment variables (e.g., database connection, JWT secret, API keys).

3. Run the application with Docker:
   ```sh
   docker-compose up --build
   ```
   This command will build and start the containers for the backend and database.

4. Access the application:
   - Backend API: `http://localhost:8080`
   - MongoDB will run inside a Docker container.

5. To stop the containers, run:
   ```sh
   docker-compose down
   ```

## Payment Information
For testing payments with Razorpay, use the following details:
- **Card Number**: 4111 1111 1111 1111
- **Expiry Date**: Any future date
- **CVV**: Any random three-digit number

## Usage
- Sign up or log in to access shopping features.
- Browse products, add them to the cart, and proceed to checkout.
- Track your orders from the user dashboard.
- Admin users can manage products and orders.

## Admin Credentials
- **Email**: admin@gmail.com
- **Password**: Admin1234

## User Credentials
- **Email**: arju12@gmail.com
- **Password**: Endgame123

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

