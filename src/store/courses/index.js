import firebase from "../../components/firebase/firebaseInit";

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
      if (payload) {
        state.courseList = payload;
      } else {
        state.courseList = [];
      }
    },

    addCourse(state, payload) {
      state.courseList.push(payload);
    },

    deleteCourse(state, payload) {
      const index = state.courseList.findIndex(course => course.id === payload);
      state.courseList.splice(index, 1);
    }
  },

  actions: {
    getCourseListFromDB({ commit, state }, payload) {
      commit("setLoading", true);

      firebase
        .collection("courses")
        .get()
        .then(querySnapshot => {
          let coursesFromDb = [];
          querySnapshot.forEach(doc => {
            let courseData = {
              courseId: doc.id,
              courseName: doc.data().courseName
            };
            coursesFromDb.push(courseData);
          });
          commit("setCourseList", coursesFromDb);
          commit("setLoading", false);
        })
        .catch(err => {
          commit("setLoading", true);
          commit("setError", err);
          alert("Error getting docs: " + err);
        });
    },

    addNewCourse({ commit, getters }, payload) {
      const newCourse = payload.newCourseName;

      firebase
        .collection("courses")
        .add({ courseName: newCourse, creatorId: getters.user.id })
        .then(() => {
          commit("addCourse", ...newCourse);
        })
        .catch(err => {
          commit("setError", err);
        });
    },

    deleteCourse({ commit }, payload) {
      let targetId = payload.courseId;

      firebase
        .collection("courses")
        .doc(targetId)
        .delete()
        .then(() => {
          commit("deleteCourse");
        })
        .catch(err => {
          commit("setError", err);
        });
    }
  },

  getters: {
    courseList(state) {
      return state.courseList;
    }
  }
};
