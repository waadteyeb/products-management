const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const resolvers = require("./resolvers");

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

const PORT =4001;
app.listen(PORT, () =>
  console.log(`Product service running on http://localhost:${PORT}/graphql`)
);
