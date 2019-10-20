import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/index";
import About from "../components/pages/about";
import Profile from "../components/pages/profile";
import SingleClass from "../components/pages/classRoster";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/about", name: "About", component: About },
    { path: "/user/:id", name: "Profile", component: Profile, props: true },
    {
      path: "/singleClass/:id",
      name: "singleClass",
      component: SingleClass,
      props: true
    }
  ]
});
