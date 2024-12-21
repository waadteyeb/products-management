<template>
  <div
    class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <!-- Optional Icon -->
    <svg
      class="w-7 h-7 text-gray-500 dark:text-gray-400 mb-3"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        d="M18 5h-.7c.229-.467.349-.98.351-1.5a3.5 3.5 0 0 0-3.5-3.5c-1.717 0-3.215 1.2-4.331 2.481C8.4.842 6.949 0 5.5 0A3.5 3.5 0 0 0 2 3.5c.003.52.123 1.033.351 1.5H2a2 2 0 0 0-2 2v3a1 1 0 0 0 1 1h18a1 1 0 0 0 1-1V7a2 2 0 0 0-2-2ZM8.058 5H5.5a1.5 1.5 0 0 1 0-3c.9 0 2 .754 3.092 2.122-.219.337-.392.635-.534.878Zm6.1 0h-3.742c.933-1.368 2.371-3 3.739-3a1.5 1.5 0 0 1 0 3h.003ZM11 13H9v7h2v-7Zm-4 0H2v5a2 2 0 0 0 2 2h3v-7Zm6 0v7h3a2 2 0 0 0 2-2v-5h-5Z"
      />
    </svg>

    <!-- Product Name -->
    <div class="mb-3">
      <template v-if="isEditing">
        <input
          v-model="editableName"
          type="text"
          class="w-full px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />
      </template>
      <template v-else>
        <h5
          class="mb-2 text-2xl font-semibold tracking-tight text-gray-900 dark:text-white"
        >
          {{ product.name }}
        </h5>
      </template>
    </div>

    <!-- Price -->
    <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
      Price:
      <span class="text-base text-gray-900 dark:text-white"
        >${{ product.price }}</span
      >
    </p>
    <!-- Category -->
    <p class="mb-3 font-normal text-gray-500 dark:text-gray-400">
      Category:
      <span class="font-medium text-blue-500"
        >{{ product.category.name }} </span
      >
    </p>

    <!-- Edit Button (Visible for Admin Only) -->
    <div v-if="isAdmin" class="mt-4">
      <button
        @click="handleEdit"
        class="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      >
        {{ isEditing ? "Save" : "Edit Product" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isEditing: false,
      editableName: this.product.name,
      token: import.meta.env.VITE_API_TOKEN,
    };
  },
  methods: {
    async handleEdit() {
      if (this.isEditing) {
        try {
          const url = import.meta.env.VITE_BACKEND_API;
          const response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: this.token,
            },
            body: JSON.stringify({
              query: `mutation {
                updateProductName(id: "${this.product.id}", name: "${this.editableName}") {
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

          // Emit the updated product to the parent component to update the product
          this.$emit("updateProduct", {
            id: this.product.id,
            name: this.editableName,
          });
          window.location.reload();
        } catch (error) {
          alert(`Failed to update product name: ${error.message}`);
        }
      }
      this.isEditing = !this.isEditing;
    },
  },
};
</script>
