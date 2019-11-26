import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/index";
import About from "../components/pages/about";
import Profile from "../components/pages/profile";
import SingleCourse from "../components/pages/singleCourse";
import firebase from "firebase";

Vue.use(VueRouter);
let router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/about", name: "About", component: About },
    {
      path: "/user/:userId",
      name: "Profile",
      component: Profile,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/singleCourse/:CourseId",
      name: "SingleCourse",
      component: SingleCourse,
      props: true,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({
        path: "/",
        query: {
          redirect: to.fullpath
        }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
