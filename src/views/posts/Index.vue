<template>
  <div class="posts-index">
    <input type="text" v-model="searchTerm" placeholder="Search"/>
    <div v-for="post in filterBy(posts, searchTerm, 'title')" v-bind:key="post.id">
      <h2>{{ post.title }}</h2>
      <router-link :to="`/posts/${post.id}`">
        <img :src="post.image" alt=""
      /></router-link>
      <p>{{ post.body }}</p>
      <!-- <p>{{ relativeDate }}</p> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
import moment from "moment";
import Vue2Filters from "vue2-filters";
export default {
  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      posts: [],
      searchTerm: "",
    };
  },
  created: function () {
    axios.get("/posts").then((response) => {
      console.log("Posts array", response.data);
      this.posts = response.data;
    });
  },
  methods: {
    relativeDate: function (date) {
      return moment(date).fromNow();
    },
  },
};
</script>
