import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/index";
import About from "../components/pages/about";
import Profile from "../components/pages/profile";
import SingleCourse from "../components/pages/singleCourse";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/about", name: "About", component: About },
    { path: "/user/:userId", name: "Profile", component: Profile, props: true },
    {
      path: "/singleCourse/:courseId",
      name: "singleCourse",
      component: SingleCourse,
      props: true
    }
  ]
});
