import * as firebase from "firebase";

export default {
  state: {
    courseList: []
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
      firebase
        .database()
        .ref("courses")
        .once("value")
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const data = {
              CourseId: doc.id,
              CourseName: doc.data().courseName
            };
            commit("setCourses", courseList);
            this.courseList.push(data);
          });
        })
        .catch(err => {
          console.log("Error getting doc: " + err);
        });
    }
  },

  getters: {}
};
