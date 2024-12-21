const { getProducts } = require("../services/productService");

const productsResolver = async (_, { search }, { token }) => {
  let products = await getProducts(search);

  products = products.map((product) => {
    let price = product.price;

    if (token === "user") {
      price = Math.round(price); // Round the price for user token
    }

    return {
      ...product,
      price,
    };
  });

  return products;
};

module.exports = productsResolver;
