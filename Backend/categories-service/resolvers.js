const categories = require("./data/data");

// Root resolver
const root = {
  categories: () => categories,
};

module.exports = root;
