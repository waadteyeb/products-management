# Project Overview

This project is a GraphQL-based e-commerce application that allows users to query and interact with product and category data. It features two primary roles: Admin and User, each with distinct permissions. The application is composed of the following key components:

1.Product Management:

..Admin can update product details, including the product name, and can view all product data with exact prices.
..User can view products, but the prices are rounded for a simplified view. Users do not have permission to update product data.

2.Category Management:

.Both Admin and User roles can query available product categories. The category data is read-only for both roles.

3.GraphQL API:

..The application exposes a powerful GraphQL API to allow clients to query data about products and categories efficiently.
..he API supports flexible queries and mutations, allowing for retrieving product data, searching for products by name, and updating product names (for admin users).

4.Role-Based Access Control:

..Admin Role: The admin role has full access to all data and can perform mutations, such as updating product names.
..User Role: The user role is limited to querying product data, and they see the price rounded. They cannot modify any data.

5.Frontend Application:

..A Vue.js frontend connects to the backend to interact with the GraphQL API, enabling users to search and view products.
..The application dynamically adjusts the displayed data based on the user's role, ensuring appropriate access and behavior for both admins and users.

This project demonstrates how to manage an e-commerce platform's core data through GraphQL, ensuring clear role-based access control, and providing flexibility for querying and updating data.

## Backend Setup

Backend Services

This section provides instructions for setting up, installing dependencies, and running each service in the backend.

# Project Setup

## Navigate to Products Service

```sh
cd products-service
npm install
```

## Navigate to Categories Service(split terminal)

```sh
cd ../categories-service
npm install
```

## Navigate to GraphQL Gateway(split terminal)

```sh
cd ../graphql-gateway
npm install
```

### Running the Services

#### Run Products Service

```sh
cd products-service
npm start
```

#### Run Categories Service

```sh
cd ../categories-service
npm start
```

#### Run GraphQL Gateway

```sh
cd ../graphql-gateway
npm start
```

## Frontend Setup

```sh
cd vue-project
npm install
```

### Running the frontend

```sh
npm run dev
```

#### Simulating User Roles in Frontend

Setting Up the JWT Tokens
The user roles are simulated using JWT tokens stored in the .env file. Below are the token values you can set based on the role you want to simulate:

## Admin Role:

VITE_API_TOKEN="Bearer admin"

## User Role:

VITE_API_TOKEN="Bearer user"

## No Token Provided:

VITE_API_TOKEN=""

#### Example Queries and Mutations

##### Queries

To test queries in http://localhost:4000/graphql, change the Bearer token in the header to see how the price adjustments vary:

..For the user role: The product price will be rounded.
..For the admin role: The price will remain unchanged.

1.Product Queries:

1.1.Query to get all products
query {
products {
id
name
price
category{
name
id
}
}
}
1.2.Query to get product by its name
query {
products(search: "Product 1") {
id
name
price
category{
name
id
}
}
}

2.Query to Get Categories
query {
categories {
id
name
}
}

##### Mutations

1.Mutation to update product name

mutation {
updateProductName(id: "1", name: "New Product Name") {
id
name
price
category{
name
id
}
}
}

.Note: Only users with the admin role can execute this mutation. If the token is for a user role, the request will be rejected with a "Forbidden" error.

# Testing

## Server Side

1. Manual Testing of GraphQL Queries and Mutations
   You can test the GraphQL queries and mutations manually by using Postman. Below are instructions :

Using Postman

Set up your request:

Open Postman and create a new POST request.
Set the URL to http://localhost:4000/graphql
Add Authorization Header:

In Postman, under the Headers tab, add an authorization header to simulate different user roles:
For Admin Role: Add Authorization: Bearer admin.
For User Role: Add Authorization: Bearer user.
For No Token: Leave the Authorization header empty to simulate an unauthorized user.
Add the GraphQL Query or Mutation:

Set the body type to raw and choose JSON format.
Paste the GraphQL query or mutation in the request body.
Example query to get products:

query {
products {
id
name
price
category{
name
id
}
}
}
Example mutation to update product name:

mutation {
updateProductName(id: "1", name: "Updated Product Name") {
id
name
price
category{
name
id
}
}
}
Send the Request:

Press Send in Postman to execute the query or mutation.
Check the Response section to see the result. 2. Verifying Role-Based Behavior
When testing with different roles (admin vs. user), you should observe the following:

For Admin Role:

.Admin can update product names using the mutation.
Prices are displayed as they are (no rounding).
.For User Role:

Users cannot update product names (they will get a "Forbidden" error).
Prices are rounded (e.g., from 19.99 to 20). 3. Example Manual Test Cases
Test Case 1: Query for all products as an admin.

Request: POST to /graphql with admin token.
Expected result: List of products with correct price values.
Test Case 2: Query for all products as a user.

Request: POST to /graphql with user token.
Expected result: List of products with rounded prices.
Test Case 3: Mutation to update product name by a user.

Request: POST to /graphql with user token.
Expected result: Forbidden error indicating only admin can update.
Test Case 4: Mutation to update product name by an admin.

Request: POST to /graphql with admin token.
Expected result: The product's name should be updated, and the new name should be returned. 4. Troubleshooting
No response from the server:
Ensure the backend server is running and check if there are any errors in the server logs.
Forbidden Error when updating product name:
Verify that you are using the correct token (Bearer admin for admin access).
Price not rounding as expected:
Check the Authorization header in the request to ensure you're testing with the correct role.

## Editing Data

Within each service ( products-service and categories-service), there is a folder named data. Inside this folder, you can freely modify the data as needed.

## Frontend Side

Setting Up the JWT Tokens
The user roles are simulated using JWT tokens stored in the .env file. Below are the token values you can set based on the role you want to simulate:

## Admin Role:

VITE_API_TOKEN="Bearer admin"

## User Role:

VITE_API_TOKEN="Bearer user"

## No Token Provided:

VITE_API_TOKEN=""
