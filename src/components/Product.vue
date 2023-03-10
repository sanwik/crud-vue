<template>
  <div class="product-container">
    <div
      class="thumbnail"
      v-bind:style="{ 'background-image': 'url(' + product.thumbnail + ')' }"
    ></div>
    <div class="product-info">
      <div v-if="!edit">
        <h2>{{ product.title }}</h2>
        <p>Category: {{ product.category }}</p>
        <p>{{ product.description }}</p>
        <div class="price-info">
          <div
            class="discount"
            :class="{ discountUnderTen: underTen(product.discountPercentage) }"
          >
            -{{ product.discountPercentage }}%
          </div>
          <div class="price">${{ product.price }}</div>
        </div>
        <button class="delete" @click="$emit('delete')">Delete</button>
        <button class="edit" @click="editProduct()">Edit</button>
      </div>
      <form v-else class="edit-form">
        <div>
          <label>Name: </label>
          <input
            type="text"
            v-model="product.title"
            @placeholder="product.title"
            required
          />
        </div>
        <div>
          <label>Price: </label>
          <input
            type="number"
            v-model="product.price"
            @placeholder="product.price"
          />
        </div>
        <button
          class="save"
          @click="submit(product.price, product.title, product.id)"
        >
          Save
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["product", "index"],
  data() {
    return {
      edit: false,
      titleInput: "",
      priceInput: "",
    };
  },
  methods: {
    editProduct: function () {
      this.edit = true;
    },
    submit: function (priceInput, titleInput, id) {
      if (titleInput == "") {
        return;
      } else {
        this.$emit("save", priceInput, titleInput, id);
        this.edit = false;
      }
    },
    underTen: function (discountPercentage) {
      if (discountPercentage < 10) {
        return true;
      }
    },
  },
};
</script>

<style>
.product-container {
  display: flex;
  justify-content: space-between;
  text-align: left;
}

.thumbnail {
  height: 220px;
  width: 220px;
  background-size: cover;
  background-position: center;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}

.product-info {
  width: 360px;
  padding: 20px;
  background-color: #ecf2ff;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}

h2 {
  font-size: 24px;
}

p {
  width: 290px;
  font-size: 12px;
  text-align: left;
}

.price-info {
  float: right;
}

.price {
  font-size: 16px;
  text-align: right;
}

.discount {
  color: #e26868;
  font-weight: bold;
  font-size: 18px;
  text-align: right;
}

button {
  margin-right: 5px;
  color: #fff !important;
}

.save {
  background-color: #3d8361 !important;
}

.edit {
  background-color: #4c6793 !important;
}

.delete {
  background-color: #e26868 !important;
}

.edit-form input {
  background-color: #fff !important;
  border-style: solid;
  height: 32px;
  padding: 5px;
}

.edit-form button {
  margin-top: 10px;
}

form label {
  padding-left: 0;
}

.discountUnderTen {
  color: #dca842;
}
</style>
