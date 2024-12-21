const productsResolver = require("./queries/products");
const updateProductNameResolver = require("./mutations/updateProductName");
const categoriesResolver = require("./queries/categories");

const resolvers = {
  Query: {
    products: productsResolver,
    categories: categoriesResolver,
  },
  Mutation: {
    updateProductName: updateProductNameResolver,
  },
};

module.exports = resolvers;
