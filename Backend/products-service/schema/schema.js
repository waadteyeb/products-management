const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Category {
    id: ID!
    name: String!
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    category: Category!
  }

  type Query {
    products: [Product!]!
  }

  type Mutation {
    updateProductName(id: ID!, name: String!): Product!
  }
`);

module.exports = schema;
