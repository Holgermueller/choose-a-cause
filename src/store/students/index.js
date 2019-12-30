import firebase from "../../components/firebase/firebaseInit";

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

    updateStudentInfo() {},

    removeStudentFromRoster(state, payload) {
      state.studentsOnCourseRoster.findIndex(student => student.id === payload);
    }
  },

  actions: {
    getCourseRoster({ commit, getters }) {
      commit("setLoading", true);

      firebase
        .collection("roster")
        .where()
        .orderBy("preferredName")
        .onSnapshot(
          querySnapshot => {
            let studentsFromDb = [];
            querySnapshot.forEach(doc => {
              let studentData = {
                studentId: doc.id,
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                preferredName: doc.data().preferredName,
                courseId: doc.data().courseId
              };
              studentsFromDb.push(studentData);
            });
            commit("setCourseRoster", studentsFromDb);
            commit("setLoading", false);
          },
          err => {
            commit("setLoading", true);
            commit("setError", err);
          }
        );
    },

    addStudentToRoster({ commit }, payload) {
      commit("setLoading", true);

      firebase
        .collection("roster")
        .add({
          firstname: payload.firstName,
          lastname: payload.lastName,
          preferredname: payload.preferredName,
          courseId: payload.courseId
        })
        .then(() => {
          commit("setLoading", false);
        })
        .catch(err => {
          commit("setLoading", true);
          commit("setError", err);
        });
    },

    updateStudentInfo() {},

    removeStudentFromRoster({ commit }, payload) {
      let targetId = payload.studentId;

      firebase
        .collection("roster")
        .doc(targetId)
        .delete()
        .then(() => {})
        .catch(err => {
          commit("setError", err);
        });
    }
  },

  getters: {
    courseRoster(state) {
      return state.studentsOnCourseRoster;
    }
  }
};
