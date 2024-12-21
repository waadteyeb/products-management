const fetch = require("node-fetch");

const getCategories = async () => {

  const response = await fetch("http://localhost:4002/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{ categories { id name } }`,
    }),
  });
  const data = await response.json();
  return data.data.categories;
};

module.exports = { getCategories };
