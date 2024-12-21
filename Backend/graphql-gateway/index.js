const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const gatewaySchema = require("./schema/schema");
const resolvers = require("./resolvers");
const authenticate = require("./middleware/authenticate");
const cors = require("cors");

const app = express();

const server = new ApolloServer({
  schema: makeExecutableSchema({ typeDefs: gatewaySchema, resolvers }),
  context: ({ req }) => ({ token: req.token }),
});

async function startServer() {
  await server.start();
  const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
  };

  // CORS middleware
  app.use(cors(corsOptions));
  app.use(express.json());

  // Authentication
  app.use("/graphql", authenticate("user"));
  app.use("/graphql", (req, res, next) => {
    if (
      req.method === "POST" &&
      req.body.operationName === "updateProductName"
    ) {
      return authenticate("admin")(req, res, next);
    }
    next();
  });

  server.applyMiddleware({ app });
  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Gateway running on http://localhost:${PORT}/graphql`);
  });
}

startServer();
