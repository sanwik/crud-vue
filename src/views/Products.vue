<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mt-10">
        <div class="manage-container">
          <h1>Store</h1>
          <div class="search-container">
            <input
              type="text"
              class="search"
              v-model="searchString"
              placeholder="Search products"
            />
          </div>
          <div>
            <button type="button" @click="sortLowestPrice()">
              Sort by lowest price
            </button>
            <button type="button" @click="sortHighestPrice()">
              Sort by highest price
            </button>
          </div>
          <div>
            <button type="button" class="category" @click="toggleCategories()">
              Toggle categories
            </button>
          </div>
          <div class="categories" v-if="showCategories">
            <button
              v-for="category in categories"
              type="button"
              class="category"
              @click="showCategory(category)"
            >
              {{ capitalize(category) }}
            </button>
          </div>
          <div>
            <button type="button" @click="showAllProducts()">
              Show all products
            </button>
          </div>
          <div v-if="showNewProductForm">
            <NewProductForm
              @cancel="toggleNewProductForm()"
              @add="addNewProduct"
            ></NewProductForm>
          </div>
          <div v-else>
            <button class="add" @click="toggleNewProductForm()">
              Add new product
            </button>
          </div>
        </div>
        <div class="products">
          <div v-for="(product, index) in searchProducts" :key="product.id">
            <Product
              :product="product"
              @delete="deleteProduct(index)"
              @save="saveEdit"
            ></Product>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Product from "../components/Product.vue";
import NewProductForm from "../components/NewProductForm.vue";
export default {
  name: "Products",
  components: { Product, NewProductForm },
  data() {
    return {
      currentProducts: [],
      allProducts: [],
      searchString: "",
      showNewProductForm: false,
      categories: [
        "smartphones",
        "laptops",
        "fragrances",
        "skincare",
        "home decoration",
        "groceries",
      ],
      showCategories: false,
    };
  },
  methods: {
    getData: async function () {
      if (window.localStorage.getItem("products")) {
        this.allProducts = JSON.parse(window.localStorage.getItem("products"));
        this.currentProducts = JSON.parse(
          window.localStorage.getItem("products")
        );
        return;
      } else {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        this.allProducts = data.products;
        this.currentProducts = data.products;
        window.localStorage.setItem("products", JSON.stringify(data.products));
      }
    },
    showCategory: function (category) {
      if (category == "home decoration") {
        category = "home-decoration";
      }
      this.currentProducts = this.allProducts.filter(
        (product) => product.category == category
      );
    },
    getCategories: function () {
      this.currentProducts.forEach((product) => {
        if (!this.categories.includes(product.category)) {
          this.categories.push(product.category);
        }
      });
    },
    deleteProduct: function (i) {
      this.currentProducts.splice(i, 1);
    },
    showAllProducts() {
      this.currentProducts = this.allProducts;
    },
    saveEdit: function (priceInput, titleInput, id) {
      this.currentProducts.forEach((product) => {
        if (product.id === id) {
          product.title = titleInput;
          product.price = priceInput;
        }
      });
    },
    toggleNewProductForm: function () {
      this.showNewProductForm = !this.showNewProductForm;
    },
    toggleCategories: function () {
      this.showCategories = !this.showCategories;
    },
    addNewProduct: function (
      title,
      description,
      price,
      discount,
      thumbnail,
      category
    ) {
      this.currentProducts.unshift({
        id: this.currentProducts.length + 1,
        title: title,
        description: description,
        price: price,
        discountPercentage: discount,
        thumbnail: thumbnail,
        category: category,
      });
      this.toggleNewProductForm();
    },
    capitalize(word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    },
    sortLowestPrice: function () {
      this.currentProducts.sort((a, b) => a.price - b.price);
    },
    sortHighestPrice: function () {
      this.currentProducts.sort((a, b) => b.price - a.price);
    },
  },
  computed: {
    searchProducts: function () {
      if (this.searchString === "" || this.searchString === null)
        return this.currentProducts;
      else if (this.searchString.length > 0) {
        return this.currentProducts.filter((product) =>
          product.title.toLowerCase().includes(this.searchString.toLowerCase())
        );
      }
    },
  },
  beforeMount() {
    this.getData();
  },
};
</script>

<style>
.products {
  display: grid;
  grid-template-columns: repeat(2, 550px);
  width: max-content;
  grid-gap: 20px;
  margin: auto;
  color: #332c39;
  padding: 20px;
}

button {
  background-color: #332c39 !important;
  color: #fff;
  padding: 5px 10px;
}

.add {
  background-color: #3d8361 !important;
}

.manage-container {
  width: 550px;
  margin: auto;
  background-color: #ecf2ff;
  border-radius: 10px;
  padding: 20px;
}

.category {
  background-color: #4c6793 !important;
}

.manage-container button,
.manage-container input,
h4 {
  margin: 5px;
}

.manage-container button {
  font-size: 14px;
  padding: 4px 8px;
}

.manage-container input {
  background-color: #fff;
}

.search-container {
  margin: auto;
  width: max-content;
}

.search {
  border-style: solid;
  height: 32px;
  padding: 5px;
}

.categories {
  margin: auto;
  width: 300px;
}

@media screen and (max-width: 1190px) {
  .products {
    grid-template-columns: repeat(1, 550px);
  }
}
</style>
