const products = require("./data/data");

const resolvers = {
  products: () => products,
  updateProductName: ({ id, name }) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      product.name = name;
      return product;
    }
    throw new Error("Product not found");
  },
};

module.exports = resolvers;
