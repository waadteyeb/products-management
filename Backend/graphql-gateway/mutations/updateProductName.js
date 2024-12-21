const fetch = require("node-fetch");

const updateProductNameResolver = async (_, { id, name }, { token }) => {
  if (token !== "admin") {
    throw new Error("Forbidden: Only admins can update product names");
  }
  const response = await fetch("http://localhost:4001/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `mutation {
        updateProductName(id: "${id}", name: "${name}") {
          id
          name
          price
          category{
          id
          name
          }
        }
      }`,
    }),
  });

  const data = await response.json();
  if (data.errors) {
    throw new Error(data.errors[0].message);
  }

  return data.data.updateProductName;
};

module.exports = updateProductNameResolver;
