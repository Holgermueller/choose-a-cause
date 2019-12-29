import * as firebase from "firebase";

export default {
  state: {
    studentsOnCourseRoster: []
  },

  mutations: {
    setCourseRoster(state, payload) {
      if (payload) {
        state.studentsOnCourseRoster = payload;
      } else {
        state.studentsOnCourseRoster = [];
      }
    },

    addStudentToRoster(state, payload) {
      state.studentsOnCourseRoster.push(payload);
    },

    updateStudentInfo() {},

    removeStudentFromRoster(state, payload) {
      state.studentsOnCourseRoster.findIndex(student => student.id === payload);
    }
  },

  actions: {
    getCourseRoster() {},

    addStudentToRoster() {},

    updateStudentInfo() {},

    removeStudentFromRoster() {}
  },

  getters: {
    courseRoster(state) {
      return state.studentsOnCourseRoster;
    }
  }
};
