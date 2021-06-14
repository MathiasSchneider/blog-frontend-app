<template>
  <div class="newpost">
    <form v-on:submit.prevent="createPost()">
      <h1>New Post</h1>
      <ul>
        <li class="text-danger" v-for="error in errors" v-bind:key="error">
          {{ error }}
        </li>
      </ul>
      <img v-if="status" :src="`https://http.cat/${status}`" alt="">
      <div class="form-group">
        <label>Title:</label>
        <input type="text" class="form-control" v-model="newPostParams.title" />
      </div>
      <div class="form-group">
        <label>Image:</label>
        <input type="text" class="form-control" v-model="newPostParams.image" />
      </div>
      <div class="form-group">
        <label>Body:</label>
        <input type="text" class="form-control" v-model="newPostParams.body" />
        <p>{{ 25 - newPostParams.body.length }} characters remaining</p>
      </div>
      <input type="submit" class="btn btn-primary" value="Submit" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      newPostParams: {
        title: "",
        body: "",
        image: "",
      },
      errors: [],
      status: "",
    };
  },
  methods: {
    createPost: function () {
      axios
        .post("/posts", this.newPostParams)
        .then((response) => {
          console.log(response.data);
          this.$router.push("/posts");
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    }
  }
};
</script>
