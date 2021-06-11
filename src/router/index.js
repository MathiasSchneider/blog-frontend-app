import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Test from "../views/Test.vue";
import Signup from "../views/Signup.vue";
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import Postsindex from "../views/posts/Index.vue";
import Postsnew from "../views/posts/New.vue";
import Postsshow from "../views/posts/Show.vue";
import Postsedit from "../views/posts/Edit.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: About,
  },
  {
    path: "/test",
    name: "Test",
    component: Test,
  },
  {
    path: "/signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
  },
  {
    path: "/posts",
    name: "posts-index",
    component: Postsindex,
  },
  {
    path: "/posts/new",
    name: "posts-new",
    component: Postsnew,
  },
  {
    path: "/posts/:id",
    name: "posts-show",
    component: Postsshow,
  },
  {
    path: "/posts/:id/edit",
    name: "posts-edit",
    component: Postsedit,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
