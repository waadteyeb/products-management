<template>
  <div>
    <!-- Conditional Message -->
    <div
      v-if="products.length === 0"
      class="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
      role="alert"
    >
       Product doesn't exist.
    </div>

    <!-- Product List -->
    <div v-else class="product-container">
      <ProductItem
        v-for="product in products"
        :key="product.id"
        :product="product"
        :is-admin="isAdmin"
      />
    </div>
  </div>
</template>

<script>
import ProductItem from './ProductItem.vue';

export default {
  props: ['products', 'isAdmin', 'updateProduct'],
  components: { ProductItem },
};
</script>

<style scoped>
.product-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
  gap: 16px;
}

@media (max-width: 425px) {
  .product-container {
    grid-template-columns: 1fr; 
  }
}
</style>
