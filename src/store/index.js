import Vue from "vue";
import Vuex from "vuex";

import instructor from "./instructor";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    instructor: instructor
  }
});
