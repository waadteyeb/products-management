const { buildSchema } = require("graphql");

const schema = buildSchema(`
  type Category {
    id: ID!
    name: String!
  }
  type Query {
    categories: [Category!]!
  }
`);

module.exports = schema;
