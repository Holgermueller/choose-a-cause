import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/index";
import About from "../components/pages/about"

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [{ path: "/", name: "Home", component: Home },{path: "/about", name: "About", component: About}
]
});
