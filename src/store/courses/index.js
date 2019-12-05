import * as firebase from "firebase";

export default {
  state: {
    CourseList: []
  },

  mutations: {
    setCourses(state, payload) {
      state.courseList = payload;
    },

    addCourse(state, payload) {
      state.courseList.push(payload);
    }
  },

  actions: {
    loadCourses({ commit }) {
      commit("setLoading", true);
      firebase
        .collection("courses")
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              CourseId: doc.id,
              CourseName: doc.data().courseName
            };
            this.CourseList.push(data);
            commit("setCourses", this.CourseList);
          });
        })
        .catch(err => {
          commit("setLoading", false);
          console.log("Error getting doc: " + err);
        });
    }
  },

  getters: {
    loadCourses(state) {
      return state.CourseList;
    }
  }
};
