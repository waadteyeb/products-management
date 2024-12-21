<template>
  <div
    class="flex flex-col items-center justify-center min-h-screen p-4 space-y-6"
  >
    <!-- Authentication Error Message -->
    <div
      v-if="authError"
      class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
      role="alert"
    >
      <span class="font-medium">Authentication required</span> . Please provide
      valid token
    </div>

    <!-- Search and Filters Row -->
    <div
      v-else
      class="flex w-full gap-4 mb-4 items-center justify-between flex-wrap"
    >
      <!-- Search Bar -->
      <div class="flex-none w-full sm:w-1/2">
        <SearchBar @onSearch="searchProducts" class="w-full" />
      </div>

      <!-- Filters -->
      <div class="w-full sm:w-1/4 min-w-[350px] relative mt-4 sm:mt-0">
        <Filters :categories="categories" :onFilter="filterProducts" />
      </div>
    </div>

    <!-- Product List -->
    <div class="w-full">
      <ProductList
        :products="filteredProducts"
        :is-admin="isAdmin"
        @updateProduct="updateProduct"
      />
    </div>
  </div>
</template>

<script>
import SearchBar from "../components/SearchBar.vue";
import Filters from "../components/Filters.vue";
import ProductList from "../components/ProductList.vue";
import { apolloClient } from "../apollo";
import gql from "graphql-tag";

export default {
  components: { SearchBar, Filters, ProductList },
  data() {
    return {
      products: [],
      filteredProducts: [],
      categories: [],
      isAdmin: false,
      authError: false,
    };
  },
  methods: {
    async fetchProducts(searchQuery = "") {
      const query = gql`
        query GetProducts($search: String) {
          products(search: $search) {
            id
            name
            price
            category {
              id
              name
            }
          }
        }
      `;

      try {
        const { data } = await apolloClient.query({
          query,
          variables: { search: searchQuery },
        });
        this.products = data.products;
        this.filteredProducts = data.products;
        this.authError = false;
      } catch (error) {
        console.error("Error fetching products:", error);

        if (error.message.includes("Authentication")) {
          this.authError = true;
        } else {
          alert("Failed to fetch products");
        }
      }
    },
    async fetchCategories() {
      const query = gql`
        query {
          categories {
            id
            name
          }
        }
      `;
      try {
        const { data } = await apolloClient.query({ query });
        this.categories = data.categories;
        this.authError = false;
      } catch (error) {
        console.error("Error fetching categories:", error);

        // Check for authentication errors
        if (error.message.includes("Authentication")) {
          this.authError = true;
        }
      }
    },
    searchProducts(searchQuery) {
      this.filteredProducts = this.products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    },
    filterProducts({ category, minPrice, maxPrice }) {
      this.filteredProducts = this.products.filter((product) => {
        const matchesCategory = !category || product.category.id === category;
        const matchesMinPrice = !minPrice || product.price >= minPrice;
        const matchesMaxPrice = !maxPrice || product.price <= maxPrice;

        return matchesCategory && matchesMinPrice && matchesMaxPrice;
      });
    },
    updateProduct(updatedProduct) {
      // Find the product by its ID and update the name
      const productIndex = this.products.findIndex(
        (product) => product.id === updatedProduct.id
      );
      if (productIndex !== -1) {
        this.products[productIndex].name = updatedProduct.name;
        this.filteredProducts = [...this.products];
      }
    },

    // Method to check if the user has a valid token
    checkAdminRole() {
      const token = import.meta.env.VITE_API_TOKEN;
      if (
        !token ||
        (!token.startsWith("Bearer admin") && !token.startsWith("Bearer user"))
      ) {
        this.authError = true;
        this.isAdmin = false;
      } else if (token.startsWith("Bearer admin")) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
    },
  },
  created() {
    this.checkAdminRole();
    if (!this.authError) {
      this.fetchProducts();
      this.fetchCategories();
    }
  },
};
</script>
