<template>
  <div class="home">
    <div>
      <h2>New Post</h2>
      <ul>
        <li v-for="error in errors" v-bind:key="error">{{ error }}</li>
      </ul>
      Title: <input type="text" v-model="newPostParams.title" /><br />
      Body:
      <input type="text" v-model="newPostParams.body" /><br />
      Image: <input type="text" v-model="newPostParams.image" /><br />
      <button v-on:click="createPost()">Add Post</button>
    </div>
    <div v-for="post in posts" :key="post.id">
      <h3>{{ post.title }}</h3>
      <router-link :to="`/posts/${post.id}`">
        <img :src="post.image" alt=""
      /></router-link>
      <p>{{ post.body }}</p>
      <!-- <button v-on:click="showPost(post)">More Info</button> -->
    </div>
    <!-- <dialog id="post-details">
      <form method="dialog">
        <h1>Post Info</h1>
        <img :src="currentPost.image" alt="" />
        <p>Title: <input type="text" v-model="currentPost.title" /></p>
        <p>
          Image: <input type="text" v-model="currentPost.image" />
        </p>
        <p>
          Body: <input type="text" v-model="currentPost.body" />
        </p>
        <button v-on:click="updatePost()">Update</button>
        <button v-on:click="destroyPost()">Destroy</button>
        <button>Close</button>
      </form>
    </dialog> -->
  </div>
</template>

<style>
img {
  width: 250px;
}
</style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      posts: [],
      newPostParams: {},
      currentPost: {},
      errors: []
    };
  },
  created: function () {
    this.indexPosts();
  },
  methods: {
    indexPosts: function () {
      axios.get("/posts").then((response) => {
        console.log("Posts array", response.data);
        this.posts = response.data;
      });
    },
    createPost: function () {
      axios
        .post("/posts", this.newPostParams)
        .then((response) => {
          console.log("Success!", response.data);
          this.posts.push(response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
    },
    showPost: function (post) {
      console.log(post);
      this.currentPost = post;
      document.querySelector("#post-details").showModal();
    },
    updatePost: function () {
      console.log(this.currentPost);
      var updatePostParams = {
        title: this.currentPost.title,
        body: this.currentPost.body,
        image: this.currentPost.image
      };
      axios
        .patch(`/posts/${this.currentPost.id}`, updatePostParams)
        .then((response) => {
          console.log("Success!", response.data);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
        });
    },
    destroyPost: function () {
      axios.delete(`/posts/${this.currentPost.id}`).then((response) => {
        console.log("Success!", response.data);
        var index = this.posts.indexOf(this.currentPost);
        this.posts.splice(index, 1);
      });
    }
  }
};
</script>