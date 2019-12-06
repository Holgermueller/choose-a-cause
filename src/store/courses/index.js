import * as firebase from "firebase";

export default {
  state: {
    courseList: [
      {
        courseName: "Schlepping",
        courseId: "xxx"
      },
      {
        courseId: "ohnoohnoohno",
        courseName: "No more courses. Sorry."
      }
    ]
  },

  mutations: {
    setCourseList(state, payload) {
      state.courseList = payload;
    },

    addCourse(state, payload) {
      state.courseList.push(payload);
    }
  },

  actions: {
    getCourseListFromDB({ commit }) {
      commit("setLoading", true);

      let courses = [];

      commit("setCourseList", courses);

      // firebase
      //   .collection("courses")
      //   .get()
      //   .then(snapshot => {
      //     if (snapshot.empty) {
      //       let courses = [];
      //       courses.push({
      //         courseName: "No courses here. Better add some.",
      //         courseId: "???"
      //       });
      //     } else {
      //       const courses = [];
      //       snapshot.forEach(doc => {
      //         courses.push({
      //           courseId: doc.id,
      //           courseName: doc.data().courseName
      //         });
      //       });
      //       commit("setCourseList", courses);
      //       commit("setLoading", false);
      //     }
      //   })
      //   .catch(err => {
      //     commit("setLoading", false);
      //     console.log("Error getting doc: " + err);
      //   });
    },

    addNewCourse({ commit, getters }, payload) {
      const newCourse = {
        courseId: payload.courseId,
        courseName: payload.courseName,
        creatorId: getters.user.id
      };
      let key;
    },

    deleteCourse() {}
  },

  getters: {
    loadCourseList(state) {
      return state.courseList;
    }
  }
};
