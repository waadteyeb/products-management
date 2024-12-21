const { getCategories } = require("../services/categoryService");

const categoriesResolver = async () => {
  try {
    const categories = await getCategories(); 
    return categories; 
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};

module.exports = categoriesResolver;
