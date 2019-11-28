import Vue from "vue";
import Vuex from "vuex";

import instructor from "./instructor";
import courses from "./courses";
import students from "./students";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    courses: courses,
    instructor: instructor,
    students: students
  }
});
