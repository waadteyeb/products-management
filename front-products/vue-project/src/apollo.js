import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";

const url = import.meta.env.VITE_BACKEND_API;

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: url,
});

// including the authorization
const authLink = setContext((_, { headers }) => {
  const token = import.meta.env.VITE_API_TOKEN;
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
