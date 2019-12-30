import firebase from "../../components/firebase/firebaseInit";

export default {
  state: {
    courseList: []
  },

  mutations: {
    setCourseList(state, payload) {
      if (payload) {
        state.courseList = payload;
      } else {
        state.courseList = [];
      }
    },

    deleteCourse(state, payload) {
      state.courseList.findIndex(course => course.id === payload);
    }
  },

  actions: {
    getCourseListFromDB({ commit, getters }) {
      commit("setLoading", true);

      firebase
        .collection("courses")
        .where("creatorId", "==", getters.user.id)
        .orderBy("courseName")
        .onSnapshot(
          querySnapshot => {
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
          },
          err => {
            commit("setLoading", true);
            commit("setError", err);
          }
        );
    },

    addNewCourse({ commit, getters }, payload) {
      const newCourse = payload.newCourseName;

      firebase
        .collection("courses")
        .add({ courseName: newCourse, creatorId: getters.user.id })
        .then(() => {})
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
