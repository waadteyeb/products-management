const fetch = require("node-fetch");

const getProducts = async (search) => {
  const response = await fetch("http://localhost:4001/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `{
        products {
          id
          name
          price
          category {
            id
            name
          }
        }
      }`,
    }),
  });

  const data = await response.json();
  const products = data.data.products;

  // If a search term is provided, filter the products; otherwise, return all products
  if (search) {
    return products.filter((product) => {
      const productNameMatches = product.name
        .toLowerCase()
        .includes(search.toLowerCase());
      const categoryNameMatches =
        product.category && product.category.name
          ? product.category.name.toLowerCase().includes(search.toLowerCase())
          : false;

      return productNameMatches || categoryNameMatches;
    });
  }

  return products;
};

module.exports = { getProducts };
