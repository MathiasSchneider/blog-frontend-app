<template>
  <div class="posts-index">
    <input type="text" v-model="searchTerm" list="titles" placeholder="Search" />
    <br />
    <br />
    <button v-on:click="setSortAttribute('title')">Sort by title</button>
    <datalist id="titles">
      <option v-for="post in posts" v-bind:key="post.id">
        {{ post.title }}
      </option>
    </datalist>
    <div is="transition-group" appear enter-active-class="animate__animated animate__fadeIn" leave-active-class="animate__animated animate__fadeOut">
      <div v-for="post in filterBy(orderBy(posts, sortAttribute), searchTerm)" v-bind:key="post.id">
        <h2>{{ post.title }}</h2>
        <router-link :to="`/posts/${post.id}`">
         <img :src="post.image" alt="" />
        </router-link>
        <p>{{ post.body }}</p>
      </div>
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
      sortAttribute: "",
      sortOrder: 1,
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
    setSortAttribute: function (attribute) {
      if (this.sortAttribute === attribute) {
        this.sortOrder = this.sortOrder * -1;
      } else {
        this.sortOrder = 1;
        this.sortAttribute = attribute;
      }
    },
  },
};
</script>
