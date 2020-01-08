import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/index";
import About from "../components/pages/about";
import Profile from "../components/pages/profile";
import SingleCourse from "../components/pages/singleCourse";
import ForgotPassword from "../components/pages/forgotPassword";
import ResetPassword from "../components/pages/resetPassword";
import AccounteDeleted from "../components/pages/accountDeleted";
import firebase from "firebase";

Vue.use(VueRouter);

let router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/about", name: "About", component: About },
    {
      path: "/forgotPassword",
      name: "ForgotPassword",
      component: ForgotPassword
    },
    {
      path: "/resetPassword",
      name: "ResetPassword",
      component: ResetPassword
    },
    {
      path: "/user",
      name: "Profile",
      component: Profile,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/singleCourse/:courseId",
      name: "SingleCourse",
      component: SingleCourse,
      props: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/accounteDeleted",
      name: "AccounteDeleted",
      component: AccounteDeleted
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
