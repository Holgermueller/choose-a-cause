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
      state.courseList = payload;
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
    getCourseListFromDB({ commit }) {
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
            commit("setCourseList", coursesFromDb);
            commit("setLoading", false);
          });
        })
        .catch(err => {
          commit("setLoading", true);
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
          console.log(err);
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
          console.log("Document successfully deleted!");
        })
        .catch(err => {
          console.error("Error removing document: " + err);
        });
    }
  },

  getters: {
    loadCourseList(state) {
      return state.courseList;
    }
  }
};
