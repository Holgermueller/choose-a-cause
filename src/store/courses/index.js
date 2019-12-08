import db from "../../components/firebase/firebaseInit";

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
      db.collection("courses")
        .get()
        .then(data => {
          if (data.empty) {
            let newCourses = [];
            let data = {
              courseName: "No courses here. Better add some.",
              courseId: "OhNoOhNoOhNo"
            };
            newCourses.push(data);
            commit("setCourseList", newCourses);
            commit("setLoading", false);
          } else {
            let newCourses = [];
            data.forEach(doc => {
              let data = {
                courseId: doc.id,
                courseName: doc.data().courseName
              };
              newCourses.push(data);
            });
            commit("setCourseList", newCourses);
            commit("setLoading", false);
          }
        })
        .catch(err => {
          commit("setLoading", false);
          alert("Error getting docs: " + err);
        });
    },

    addNewCourse({ commit }, payload) {
      const newCourse = payload.newCourseName;

      db.collection("courses")
        .add({ courseName: newCourse })
        .then(() => {
          commit("addCourse", ...newCourse);
          console.log("Class addition successful!");
        })
        .catch(err => {
          console.log(err);
        });
    },

    deleteCourse({ commit }, payload) {
      let targetId = payload.courseId;

      db.collection("courses")
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
