<template>
  <div>
    <h4>Add new product</h4>
    <form>
      <div>
        <label class="addNew">Title:</label>
        <input type="text" maxlength="15" v-model="title" required />
      </div>
      <div>
        <label class="addNew">Description:</label>
        <textarea type="text" maxlength="40" v-model="description" />
      </div>
      <div>
        <label class="addNew">Price:</label>
        <input type="number" v-model="price" />
      </div>
      <div>
        <label class="addNew">Discount (%):</label>
        <input type="number" v-model="discount" />
      </div>
      <div>
        <label class="addNew">Thumbnail (URL):</label>
        <input type="url" v-model="thumbnail" required />
      </div>
      <div>
        <label class="addNew">Category:</label>
        <select id="category" name="category" v-model="category">
          <option value="smartphones">Smartphones</option>
          <option value="laptops">Laptops</option>
          <option value="fragrances">Fragrances</option>
          <option value="skincare">Skincare</option>
          <option value="home decoration">Home Decoration</option>
          <option value="groceries">Groceries</option>
        </select>
      </div>
      <button type="submit" @click.prevent="submit()" class="add">Add</button>
      <button type="button" @click="cancel()">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "NewProductForm",
  props: [""],
  components: {},
  data() {
    return {
      title: "",
      description: "",
      price: "",
      discount: "",
      thumbnail: "",
      category: "",
    };
  },
  methods: {
    cancel: function () {
      this.$emit("cancel");
    },
    submit: function () {
      if (this.title == "" || this.thumbnail == "") {
        alert("Please fill in the required fields!");
        return;
      }
      this.$emit(
        "add",
        this.title,
        this.description,
        this.price,
        this.discount,
        this.thumbnail,
        this.category
      );
    },
  },
  computed: {},
};
</script>

<style>
.addNew {
  width: 100px;
  margin-left: 5px;
  font-size: 14px;
}

input[type="text"],
input[type="number"],
input[type="url"] {
  background-color: #fff !important;
  display: block;
  border-style: solid;
  height: 32px;
  margin-right: 20px;
  padding: 5px;
}

textarea,
select {
  background-color: #fff !important;
  display: block;
  border-style: solid;
  border: 2px rgb(118, 118, 118) solid !important;
  height: 50px;
  margin: 5px;
  padding: 5px;
  width: 195px;
}

select {
  height: 32px;
}
</style>
