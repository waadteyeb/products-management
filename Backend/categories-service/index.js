const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const root = require("./resolvers");

const app = express();

// Apply GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);
const PORT = 4002;
// Start the server
app.listen(PORT, () => {
  console.log(`Category service running on http://localhost:${PORT}/graphql`);
});
