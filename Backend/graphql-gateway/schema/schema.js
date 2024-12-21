const { gql } = require("apollo-server-express");

const gatewaySchema = gql`
  type Product {
    id: ID!
    name: String!
    price: Float!
    categoryId: ID!
    category: Category!
  }

  type Category {
    id: ID!
    name: String!
  }

  type Query {
    products(search: String): [Product!]!
    categories: [Category!]!
  }

  type Mutation {
    updateProductName(id: ID!, name: String!): Product!
  }
`;

module.exports = gatewaySchema;
