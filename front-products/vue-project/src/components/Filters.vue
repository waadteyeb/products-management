<template>
    <!-- Filter Dropdown Button -->
    <button
      @click="toggleDropdown"
      class="text-gray-700 bg-gray-200 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center inline-flex items-center w-auto min-w-[120px]"
      ref="dropdownButton"
    >
      Sort by
      <svg
        class="w-3 h-3 ml-2"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 10 6"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 4 4 4-4"
        />
      </svg>
    </button>
  
    <!-- Dropdown Menu  -->
    <div
      v-if="dropdownVisible"
      class="absolute mt-2 bg-white shadow-lg rounded-lg p-4 z-10 max-h-[600px] overflow-y-auto"
      :class="{'left-0': isSmallScreen, 'left-[calc(100%-250px)]': !isSmallScreen}"
      :style="{ minWidth: '250px', width: 'auto' }"
    >
      <!-- Category Filter -->
      <div class="flex flex-col space-y-2">
        <label for="category" class="text-gray-700 font-semibold">Category</label>
        <select
          v-model="selectedCategory"
          @change="onFilterChange"
          id="category"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">All Categories</option>
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
  
      <!-- Min Price Filter -->
      <div class="flex flex-col space-y-2">
        <label for="minPrice" class="text-gray-700 font-semibold">Min Price</label>
        <input
          v-model.number="minPrice"
          @input="onFilterChange"
          id="minPrice"
          type="number"
          placeholder="Min Price"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
  
      <!-- Max Price Filter -->
      <div class="flex flex-col space-y-2">
        <label for="maxPrice" class="text-gray-700 font-semibold">Max Price</label>
        <input
          v-model.number="maxPrice"
          @input="onFilterChange"
          id="maxPrice"
          type="number"
          placeholder="Max Price"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ["categories", "onFilter"], 
    data() {
      return {
        selectedCategory: "",
        minPrice: "",
        maxPrice: "",
        dropdownVisible: false,
        isSmallScreen: false,
      };
    },
    mounted() {
      this.isSmallScreen = window.innerWidth < 768;
  
      window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.handleResize);
    },
    methods: {
      handleResize() {
        this.isSmallScreen = window.innerWidth < 768;
      },
      onFilterChange() {
        this.onFilter({
          category: this.selectedCategory,
          minPrice: this.minPrice,
          maxPrice: this.maxPrice,
        });
      },
      toggleDropdown() {
        // Toggle the visibility of the dropdown menu
        this.dropdownVisible = !this.dropdownVisible;
  
        // Dynamically adjust dropdown position
        this.adjustDropdownPosition();
      },
      adjustDropdownPosition() {
        const dropdownButton = this.$refs.dropdownButton;
        if (dropdownButton) {
          const rect = dropdownButton.getBoundingClientRect();
          this.dropdownLeft = rect.left;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  div[v-if="dropdownVisible"] {
    max-height: 300px;
    min-width: 250px;
    width: auto; 
    overflow-y: auto; 
  }
  
  body {
    cursor: pointer;
  }
  </style>
  