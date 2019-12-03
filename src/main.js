import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import firebase from "firebase";
import "./components/firebase/firebaseInit";
import { store } from "./store";
import AlertCmp from "./components/shared/alert.vue";

export const bus = new Vue();

Vue.config.productionTip = false;

Vue.component("app-alert", AlertCmp);

let app;
firebase.auth().onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      vuetify,
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
