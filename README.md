# Assingmet 5 Phincon Academy

![Picture](https://res.cloudinary.com/dmjd9rohb/image/upload/v1731315586/Screenshot_2024-11-11_155647_xvrrhc.png)

# Documentaion API

This project includes an API that allows for the management of customers, addresses, orders, and contacts. Below is a summary of the features available via the API


## Features Overview

### 1. **Customer**
- **Description**: The Customer feature handles user-related operations, including customer account management and order history.

#### Services:
- **Get Customer Details**: Retrieve detailed information about a customer.
- **Update Customer Profile**: Update customer information, such as name, email, and contact details.
- **Delete Customer**: Remove a customer account from the system.

---

### 2. **Address**
- **Description**: The Address feature enables managing customer shipping addresses.

#### Services:
- **Get Address**: Retrieve a customer's saved address.
- **Add Address**: Add a new address for a customer.
- **Update Address**: Modify an existing address.
- **Delete Address**: Delete a customer's saved address.

---

### 3. **Order**
- **Description**: The Order feature handles order management for customers, including order creation, status updates, and deletions.

#### Services:
- **Get Orders**: Fetch all orders for a specific customer.
- **Create Order**: Place a new order by specifying products and quantities.
- **Update Order**: Modify an existing order, such as updating the status or products.
- **Delete Order**: Remove an order from the system.

---

### 4. **Contact**
- **Description**: The Contact feature manages customer contact details like email and phone numbers.

#### Services:
- **Get Contact Info**: Retrieve the contact information for a customer.
- **Update Contact Info**: Update a customer's email and phone number.
- **Delete Contact Info**: Delete a customer's contact information.

---

## API Endpoints

### 1. **Customer**
- **GET /api/customers/{customer_id}**: Retrieve customer details.
- **PUT /api/customers/{customer_id}**: Update customer profile.
- **DELETE /api/customers/{customer_id}**: Delete a customer.

---

### 2. **Address**
- **GET /api/customers/{customer_id}/addresses**: Get all addresses for a customer.
- **POST /api/customers/{customer_id}/addresses**: Add a new address.
- **PUT /api/customers/{customer_id}/addresses/{address_id}**: Update an existing address.
- **DELETE /api/customers/{customer_id}/addresses/{address_id}**: Delete an address.

---

### 3. **Order**
- **GET /api/customers/{customer_id}/orders**: Get all orders for a customer.
- **POST /api/customers/{customer_id}/orders**: Create a new order.
- **PUT /api/orders/{order_id}**: Update an order.
- **DELETE /api/orders/{order_id}**: Delete an order.

---

### 4. **Contact**
- **GET /api/customers/{customer_id}/contact**: Get contact information.
- **PUT /api/customers/{customer_id}/contact**: Update contact information.
- **DELETE /api/customers/{customer_id}/contact**: Delete contact information.

---

## Technologies Used
- **Node.js**: Backend JavaScript runtime.
- **Express.js**: Web framework for building the API.
- **Prisma**: ORM for database interaction.
- **Swagger**: For API documentation generation.
- **PostgreSQL**: Database for storing customer, address, order, and contact information.

## How to Use This Project
1. Clone the repository:
   ```bash
   git clone https://github.com/violeteverg/Assignment2_muh_fauzan.git

## Setup Instructions

### Prerequisites
- You need to have **Node.js** and **npm** installed.
- You must have **PostgreSQL** installed and a running database.

### 1. **Install Dependencies**

Clone this repository to your local machine and navigate to the project folder. Then, install the necessary dependencies:

```bash
  npm install
  ```
### 2. **create env**
you can see example env at .env.example

```bash
   DATABASE_URL="your_database"
   PORT="your_port"
   POSTMAN_API_URL="your_postman_api_url"
   POSTMAN_ACCESS_KEY="your_postman_access_key"
  ```

### 3. **running app**

running app using

```bash
  npm run dev
  ```
